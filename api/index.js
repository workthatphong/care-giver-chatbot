const path = require('path');

const getTableName = (type) => {
  if (type === 'caregiver') return 'careGivers';
  if (type === 'patient') return 'patients';
  if (type === 'drug') return 'drugs';
  return null;
}

export default async function handler(req, res) {
  const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

  // POST Request: Handle Create, Update, Delete
  if (req.method === 'POST') {
    const { action, type, payload, id } = req.body;
    const tableName = getTableName(type);
    
    if (!tableName) return res.status(400).json({ error: "Invalid type" });

    // Clean up frontend-only array fields that are not in SQL schema
    if (payload) {
      delete payload.medications;
      delete payload.problems;
      delete payload.goals;
      delete payload.symptoms;
      delete payload._type;
      delete payload._isNew;
    }

    if (isVercel) {
      try {
        const supabase = require('../data/supabase');
        if (!supabase) throw new Error("Supabase client is not initialized.");

        let result;
        if (action === 'create') {
          result = await supabase.from(tableName).insert(payload).select().single();
        } else if (action === 'update') {
          result = await supabase.from(tableName).update(payload).eq('id', id).select().single();
        } else if (action === 'delete') {
          result = await supabase.from(tableName).delete().eq('id', id);
        }

        if (result && result.error) throw result.error;
        return res.status(200).json({ message: "Success", data: result?.data || payload });
      } catch (error) {
        console.error("Vercel/Supabase Error:", error);
        return res.status(500).json({ message: error.message, stack: error.stack, ...error });
      }
    } else {
      try {
        const Database = require('better-sqlite3');
        const dbPath = path.join(process.cwd(), 'data', 'database.db');
        const db = new Database(dbPath);
        
        let data = payload;
        if (action === 'create') {
          const keys = Object.keys(payload);
          const cols = keys.map(k => `"${k}"`).join(', ');
          const vals = keys.map(k => `@${k}`).join(', ');
          const stmt = db.prepare(`INSERT INTO "${tableName}" (${cols}) VALUES (${vals})`);
          const info = stmt.run(payload);
          data = { ...payload, id: info.lastInsertRowid };
        } else if (action === 'update') {
          const keys = Object.keys(payload).filter(k => k !== 'id');
          const sets = keys.map(k => `"${k}" = @${k}`).join(', ');
          const stmt = db.prepare(`UPDATE "${tableName}" SET ${sets} WHERE id = @id`);
          stmt.run({ ...payload, id });
        } else if (action === 'delete') {
          const stmt = db.prepare(`DELETE FROM "${tableName}" WHERE id = ?`);
          stmt.run(id);
          data = null;
        }

        db.close();
        return res.status(200).json({ message: "Success", data });
      } catch (error) {
        console.error("Local SQLite Error:", error);
        return res.status(500).json({ message: error.message, stack: error.stack, ...error });
      }
    }
  }

  // GET Request: Handle Reading Data
  if (req.method === 'GET') {
    if (isVercel) {
      try {
        const supabase = require('../data/supabase');
        if (!supabase) throw new Error("Supabase client is not initialized.");

        const [careGiversRes, patientsRes, drugsRes] = await Promise.all([
          supabase.from('careGivers').select('*'),
          supabase.from('patients').select('*'),
          supabase.from('drugs').select('*')
        ]);

        if (careGiversRes.error) throw careGiversRes.error;
        if (patientsRes.error) throw patientsRes.error;
        if (drugsRes.error) throw drugsRes.error;

        return res.status(200).json({
          message: 'Supabase Connected!',
          data: {
            careGivers: careGiversRes.data,
            patients: patientsRes.data,
            drugs: drugsRes.data
          }
        });
      } catch (error) {
        console.error("Vercel/Supabase Error:", error);
        return res.status(500).json({ message: error.message, stack: error.stack, ...error });
      }
    } else {
      try {
        const Database = require('better-sqlite3');
        const dbPath = path.join(process.cwd(), 'data', 'database.db');
        const db = new Database(dbPath, { readonly: true });
        
        const careGivers = db.prepare('SELECT * FROM careGivers').all();
        const patients = db.prepare('SELECT * FROM patients').all();
        const drugs = db.prepare('SELECT * FROM drugs').all();
        
        db.close();

        return res.status(200).json({
          message: 'Local SQLite Connected!',
          data: { careGivers, patients, drugs }
        });
      } catch (error) {
        console.error("Local SQLite Error:", error);
        return res.status(500).json({ message: error.message, stack: error.stack, ...error });
      }
    }
  }
}

const path = require('path');

export default async function handler(req, res) {
  const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

  if (isVercel) {
    try {
      const supabase = require('../data/supabase');
      if (!supabase) {
        throw new Error("Supabase client is not initialized.");
      }

      const [careGiversRes, patientsRes, drugsRes] = await Promise.all([
        supabase.from('careGivers').select('*'),
        supabase.from('patients').select('*'),
        supabase.from('drugs').select('*')
      ]);

      if (careGiversRes.error) throw careGiversRes.error;
      if (patientsRes.error) throw patientsRes.error;
      if (drugsRes.error) throw drugsRes.error;

      return res.status(200).json({
        message: 'Supabase Database Connected Successfully!',
        data: {
          careGivers: careGiversRes.data,
          patients: patientsRes.data,
          drugs: drugsRes.data
        }
      });
    } catch (error) {
      console.error("Vercel/Supabase Error:", error);
      return res.status(500).json({
        message: error.message,
        stack: error.stack,
        ...error
      });
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
        message: 'Local SQLite Database Connected Successfully!',
        data: {
          careGivers,
          patients,
          drugs
        }
      });
    } catch (error) {
      console.error("Local SQLite Error:", error);
      return res.status(500).json({
        message: error.message,
        stack: error.stack,
        ...error
      });
    }
  }
}

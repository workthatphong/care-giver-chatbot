const path = require('path');
const Database = require('better-sqlite3');

export default function handler(req, res) {
  try {
    // กำหนด Path ไปยังฐานข้อมูล SQLite ที่ data/database.db
    const dbPath = path.join(process.cwd(), 'data', 'database.db');
    const db = new Database(dbPath, { readonly: true });
    
    const careGivers = db.prepare('SELECT * FROM careGivers').all();
    const patients = db.prepare('SELECT * FROM patients').all();
    const drugs = db.prepare('SELECT * FROM drugs').all();
    
    db.close();

    res.status(200).json({
      message: 'Local Database Connected Successfully!',
      data: {
        careGivers,
        patients,
        drugs
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to read local database',
      details: error.message 
    });
  }
}

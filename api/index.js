const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  try {
    // กำหนด Path ไปยังฐานข้อมูลชั่วคราว (Local Database) ที่เราสร้างไว้ใน data/db.json
    const dbPath = path.join(process.cwd(), 'data', 'db.json');
    const dbData = fs.readFileSync(dbPath, 'utf8');
    
    res.status(200).json({
      message: 'Local Database Connected Successfully!',
      data: JSON.parse(dbData)
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to read local database',
      details: error.message 
    });
  }
}

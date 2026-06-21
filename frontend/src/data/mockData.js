export const careGivers = [
  { id: 1, title: 'นางสาว', fname: 'สมใจ', lname: 'รักษ์ดี', carePlans: 12, nid: '1-1234-56789-01-2', address: '12/34', moo: '5', subdist: 'หนองปรือ', dist: 'บางละมุง', prov: 'ชลบุรี', patients: 3, img: 'https://placehold.co/150x150/fce7f3/db2777?text=SR' },
  { id: 2, title: 'นาย', fname: 'กล้าหาญ', lname: 'ชาญชัย', carePlans: 18, nid: '3-9876-54321-09-8', address: '88', moo: '1', subdist: 'แสนสุข', dist: 'เมือง', prov: 'ชลบุรี', patients: 5, img: 'https://placehold.co/150x150/fce7f3/db2777?text=KC' },
  { id: 3, title: 'นาง', fname: 'มาลี', lname: 'มีสุข', carePlans: 8, nid: '2-3456-78901-23-4', address: '9/1', moo: '2', subdist: 'ห้วยกะปิ', dist: 'เมือง', prov: 'ชลบุรี', patients: 2, img: 'https://placehold.co/150x150/fce7f3/db2777?text=MM' },
  { id: 4, title: 'นาย', fname: 'ใจดี', lname: 'มีเมตตา', carePlans: 24, nid: '1-4567-89012-34-5', address: '45/2', moo: '3', subdist: 'บ้านบึง', dist: 'บ้านบึง', prov: 'ชลบุรี', patients: 6, img: 'https://placehold.co/150x150/fce7f3/db2777?text=JM' }
];

export const patients = [
  { id: 101, title: 'นาย', fname: 'บุญมี', lname: 'ดีพร้อม', age: 72, nid: '3-2222-33333-44-5', adl: 12, ltcGroup: 'กลุ่ม 2', frequency: '2 ครั้ง/สัปดาห์', weight: 65, height: 165, bmi: 23.8, waist: 85, address: '15', moo: '2', subdist: 'เสม็ด', dist: 'เมือง', prov: 'ชลบุรี', primaryCareGiver: 'สมใจ รักษ์ดี', careGiverId: 1, img: 'https://placehold.co/150x150/e0f2fe/0284c7?text=BD' },
  { id: 102, title: 'นาง', fname: 'ทองม้วน', lname: 'ชวนชม', age: 81, nid: '3-5555-66666-77-8', adl: 4, ltcGroup: 'กลุ่ม 4', frequency: '4 ครั้ง/สัปดาห์', weight: 52, height: 150, bmi: 23.1, waist: 78, address: '42/1', moo: '4', subdist: 'อ่างศิลา', dist: 'เมือง', prov: 'ชลบุรี', primaryCareGiver: 'กล้าหาญ ชาญชัย', careGiverId: 2, img: 'https://placehold.co/150x150/e0f2fe/0284c7?text=TC' },
  { id: 103, title: 'นาย', fname: 'สมคิด', lname: 'จิตสงบ', age: 68, nid: '3-8888-99999-00-1', adl: 18, ltcGroup: 'กลุ่ม 1', frequency: '1 ครั้ง/สัปดาห์', weight: 70, height: 170, bmi: 24.2, waist: 90, address: '8/9', moo: '1', subdist: 'ห้วยกะปิ', dist: 'เมือง', prov: 'ชลบุรี', primaryCareGiver: 'มาลี มีสุข', careGiverId: 3, img: 'https://placehold.co/150x150/e0f2fe/0284c7?text=SJ' }
];

export const drugs = [
  { id: 201, name: 'Paracetamol', dosage: '500 mg', barcode: '8850001000123', colorTxt: 'ขาว', colorHex: '#ffffff', shapeTxt: 'กลม', shapeType: 'round', realImg: 'https://placehold.co/300x200/f8fafc/94a3b8?text=Real+Pack' },
  { id: 202, name: 'Amoxicillin', dosage: '250 mg', barcode: '8850002000456', colorTxt: 'ฟ้า', colorHex: '#7dd3fc', shapeTxt: 'แคปซูล', shapeType: 'capsule', realImg: 'https://placehold.co/300x200/f8fafc/94a3b8?text=Real+Pack' },
  { id: 203, name: 'Ibuprofen', dosage: '400 mg', barcode: '8850003000789', colorTxt: 'ชมพู', colorHex: '#f472b6', shapeTxt: 'วงรี', shapeType: 'oval', realImg: 'https://placehold.co/300x200/f8fafc/94a3b8?text=Real+Pack' },
  { id: 204, name: 'Amlodipine', dosage: '5 mg', barcode: '8850004000012', colorTxt: 'ขาว', colorHex: '#ffffff', shapeTxt: 'วงรี', shapeType: 'oval', realImg: 'https://placehold.co/300x200/f8fafc/94a3b8?text=Real+Pack' },
];

export const careplans = [
  { 
    id: 301, 
    patientId: 101, 
    careGiverId: 1, 
    date: '2023-10-25', 
    time: '10:30', 
    duration: '45 นาที',
    symptomsSummary: 'ผู้ป่วยมีอาการอ่อนเพลียเล็กน้อย แต่สามารถทำกิจกรรมพื้นฐานได้',
    temp: 36.5,
    hr: 78,
    rr: 20,
    bp: '120/80',
    screening2Q: 'ปกติ',
    adlToday: 11,
    amt: 'ปกติ (8/10)',
    generalCondition: 'รู้สึกตัวดี ถามตอบรู้เรื่อง ช่วยเหลือตัวเองได้บางส่วน',
    activitiesPerformed: 'เช็ดตัว, วัดความดัน, ทำกายภาพบำบัดเบื้องต้น',
    evaluationResult: 'ผู้ป่วยให้ความร่วมมือดี ชีพจรและความดันอยู่ในเกณฑ์ปกติ'
  }
];

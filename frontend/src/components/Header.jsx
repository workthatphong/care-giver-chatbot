import React from 'react';
import { Plus } from 'lucide-react';

const Header = ({ currentView, onAdd }) => {
  let title = '';
  let desc = '';
  let btnText = '';

  switch (currentView) {
    case 'caregiver':
      title = 'ผู้ดูแล';
      desc = 'จัดการรายชื่อและข้อมูลผู้ดูแลในระบบ';
      btnText = 'เพิ่มผู้ดูแล';
      break;
    case 'patient':
      title = 'ผู้ป่วย';
      desc = 'จัดการรายชื่อและข้อมูลผู้ป่วยในระบบ';
      btnText = 'เพิ่มผู้ป่วย';
      break;
    case 'drug':
      title = 'ยา';
      desc = 'จัดการคลังยา ขนาดยา และรูปแบบเม็ดยา';
      btnText = 'เพิ่มยา';
      break;
    case 'careplan':
      title = 'แผนการดูแล';
      desc = 'จัดการและบันทึกผลการตรวจคัดกรองรายวัน';
      btnText = 'เพิ่มบันทึก';
      break;
    default:
      title = 'ข้อมูล';
      desc = 'ข้อมูลระบบอยู่ระหว่างการพัฒนา';
      btnText = 'เพิ่มข้อมูล';
      break;
  }

  return (
    <div className="flex justify-between items-center px-8 pt-8 pb-4 sm:px-12 sm:pt-10 bg-white">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
      </div>
      <button onClick={onAdd} className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-full font-medium text-sm shadow-[0_4px_14px_rgba(236,72,153,0.3)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(236,72,153,0.4)] hover:-translate-y-0.5 flex items-center gap-2 outline-none">
        <Plus className="w-4 h-4" />
        <span>{btnText}</span>
      </button>
    </div>
  );
};

export default Header;

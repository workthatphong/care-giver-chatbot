import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] transition-opacity duration-300" onClick={onClose}></div>
      
      <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-sm z-10 animate-popUp border border-gray-100 overflow-hidden">
        <div className="p-7">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-5 mx-auto shadow-inner border border-red-100">
            <AlertTriangle className="w-8 h-8" />
          </div>
          
          <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">ยืนยันการลบข้อมูล</h3>
          <p className="text-sm text-center text-gray-500 mb-8 leading-relaxed">
            คุณแน่ใจหรือไม่ว่าต้องการลบ <span className="font-semibold text-gray-800">"{itemName}"</span>?<br/> การกระทำนี้ไม่สามารถย้อนกลับได้
          </p>
          
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-800 transition-colors outline-none">
              ยกเลิก
            </button>
            <button onClick={onConfirm} className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-medium hover:bg-red-600 shadow-[0_4px_14px_rgba(239,68,68,0.25)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.35)] hover:-translate-y-0.5 transition-all outline-none">
              ลบข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

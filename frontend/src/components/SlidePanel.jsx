import React from 'react';
import { 
  X, CreditCard, ClipboardList, Users, MapPin, ChevronRight, 
  HeartHandshake, Barcode, Edit3, Trash2, UserMinus 
} from 'lucide-react';
import { careGivers, patients, drugs } from '../data/mockData';

const getPillSVG = (shape, colorHex) => {
  let svgContent = '';
  let stroke = (colorHex === '#ffffff' || colorHex.toLowerCase() === '#fff') ? 'stroke="#e2e8f0" stroke-width="4"' : '';
  
  if (shape === 'round') {
      svgContent = `<circle cx="50" cy="50" r="40" fill="${colorHex}" ${stroke} />`;
  } else if (shape === 'oval') {
      svgContent = `<ellipse cx="50" cy="50" rx="45" ry="30" fill="${colorHex}" ${stroke} />`;
  } else if (shape === 'capsule') {
      svgContent = `<rect x="15" y="30" width="70" height="40" rx="20" fill="${colorHex}" ${stroke} />`;
      svgContent += `<line x1="50" y1="30" x2="50" y2="70" stroke="rgba(0,0,0,0.15)" stroke-width="3" />`;
  }
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${svgContent}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const SlidePanel = ({ detailOpen, setDetailOpen }) => {
  if (!detailOpen) return null;

  const { type, id } = detailOpen;
  
  let data = null;
  if (type === 'caregiver') data = careGivers.find(c => c.id === id);
  if (type === 'patient') data = patients.find(p => p.id === id);
  if (type === 'drug') data = drugs.find(d => d.id === id);

  if (!data) return null;

  return (
    <>
      <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-[2px] z-40 transition-opacity duration-300" onClick={() => setDetailOpen(null)}></div>
      <div className="absolute inset-y-0 right-0 w-full sm:w-[420px] bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.05)] z-50 transform translate-x-0 transition-transform duration-300 ease-out flex flex-col h-full border-l border-pink-50">
        
        {/* Header */}
        <div className="p-8 pb-6 border-b border-pink-50 flex justify-between items-start relative bg-gradient-to-b from-pink-50/30 to-transparent">
            <div className="flex items-center gap-5">
               <img src={data.img || data.realImg} className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-sm bg-pink-50" alt="profile" />
               <div>
                   <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
                     {data.title ? `${data.title}${data.fname} ${data.lname}` : data.name}
                   </h2>
                   {data.nid && (
                     <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                         <CreditCard className="w-3.5 h-3.5" />
                         <p className="text-sm font-mono">{data.nid}</p>
                     </div>
                   )}
               </div>
            </div>
            <button onClick={() => setDetailOpen(null)} className="p-2 bg-white rounded-full text-gray-400 hover:text-pink-500 hover:bg-pink-50 shadow-sm border border-gray-50 transition-all focus:outline-none">
                <X className="w-4 h-4" />
            </button>
        </div>

        {/* Body Container */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          
          {/* Care Giver Detail */}
          {type === 'caregiver' && (
            <>
              <div className="flex gap-4">
                  <div className="flex-1 bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                      <span className="text-[11px] text-gray-400 font-medium mb-1">จำนวน Care Plan</span>
                      <div className="flex items-center gap-1.5 text-gray-800">
                          <ClipboardList className="w-4 h-4 text-pink-400" />
                          <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-bold">{data.carePlans}</span>
                              <span className="text-xs text-gray-400 font-medium">แผน</span>
                          </div>
                      </div>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                      <span className="text-[11px] text-gray-400 font-medium mb-1">คนไข้ที่ดูแล</span>
                      <div className="flex items-center gap-1.5 text-gray-800">
                          <Users className="w-4 h-4 text-blue-400" />
                          <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-bold">{data.patients}</span>
                              <span className="text-xs text-gray-400 font-medium">คน</span>
                          </div>
                      </div>
                  </div>
              </div>
              
              <div>
                  <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 border border-gray-100">
                          <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-sm font-medium text-gray-700">ที่อยู่ติดต่อ</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-y-5 gap-x-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] text-sm">
                      <div>
                          <p className="text-gray-400 text-[11px] font-medium mb-1">บ้านเลขที่</p>
                          <p className="font-medium text-gray-800">{data.address}</p>
                      </div>
                      <div>
                          <p className="text-gray-400 text-[11px] font-medium mb-1">หมู่</p>
                          <p className="font-medium text-gray-800">{data.moo}</p>
                      </div>
                      <div>
                          <p className="text-gray-400 text-[11px] font-medium mb-1">ตำบล</p>
                          <p className="font-medium text-gray-800">{data.subdist}</p>
                      </div>
                      <div>
                          <p className="text-gray-400 text-[11px] font-medium mb-1">อำเภอ</p>
                          <p className="font-medium text-gray-800">{data.dist}</p>
                      </div>
                      <div className="col-span-2">
                          <p className="text-gray-400 text-[11px] font-medium mb-1">จังหวัด</p>
                          <p className="font-medium text-gray-800">{data.prov}</p>
                      </div>
                  </div>
              </div>

              <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                              <Users className="w-3.5 h-3.5" />
                          </div>
                          <h4 className="text-sm font-medium text-gray-700">คนไข้ในการดูแล</h4>
                      </div>
                      <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        {patients.filter(p => p.careGiverId === data.id).length} คน
                      </span>
                  </div>
                  <div className="space-y-3">
                      {patients.filter(p => p.careGiverId === data.id).length > 0 ? (
                        patients.filter(p => p.careGiverId === data.id).map(p => (
                          <div key={p.id} onClick={() => setDetailOpen({ type: 'patient', id: p.id })} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl cursor-pointer hover:border-blue-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.08)] transition-all duration-300 group">
                              <img src={p.img} className="w-10 h-10 rounded-full object-cover bg-gray-50 border border-gray-100" alt="patient" />
                              <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-semibold text-gray-800 truncate">{p.fname} {p.lname}</p>
                                  <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-gray-500">
                                      <span>อายุ {p.age} ปี</span>
                                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                      <span className="font-medium text-blue-500">ADL: {p.adl}</span>
                                  </div>
                              </div>
                              <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                  <ChevronRight className="w-3.5 h-3.5" />
                              </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-5 text-gray-400 bg-gray-50 rounded-xl border border-gray-100 border-dashed flex flex-col items-center justify-center gap-2">
                            <UserMinus className="w-5 h-5 text-gray-300" />
                            <span className="text-xs">ยังไม่มีคนไข้ในการดูแล</span>
                        </div>
                      )}
                  </div>
              </div>
            </>
          )}

          {/* Patient Detail */}
          {type === 'patient' && (
            <>
              <div className="bg-pink-50/40 hover:bg-pink-100/60 cursor-pointer transition-all duration-300 rounded-2xl p-4 border border-pink-100/80 flex items-center justify-between group shadow-sm hover:shadow-md" onClick={() => setDetailOpen({ type: 'caregiver', id: data.careGiverId })}>
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-500 shadow-sm border border-pink-50 group-hover:scale-105 transition-transform">
                          <HeartHandshake className="w-5 h-5" />
                      </div>
                      <div>
                          <p className="text-[11px] text-pink-500 font-medium mb-0.5">ผู้ดูแลรับผิดชอบหลัก</p>
                          <p className="text-sm font-semibold text-gray-800">{data.primaryCareGiver}</p>
                      </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-pink-300 group-hover:text-pink-600 shadow-sm transition-colors border border-pink-50">
                      <ChevronRight className="w-4 h-4" />
                  </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                      <p className="text-[10px] text-gray-400 font-medium mb-0.5">ADL ปัจจุบัน</p>
                      <p className="text-lg font-bold text-gray-800">{data.adl}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                      <p className="text-[10px] text-gray-400 font-medium mb-0.5">กลุ่ม LTC</p>
                      <p className="text-sm font-bold text-blue-500 mt-1">{data.ltcGroup}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                      <p className="text-[10px] text-gray-400 font-medium mb-0.5">ความถี่การดูแล</p>
                      <p className="text-xs font-semibold text-gray-800 mt-1 leading-tight">{data.frequency}</p>
                  </div>
              </div>

              <div>
                  <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 ml-1">ข้อมูลสุขภาพเบื้องต้น</h4>
                  <div className="grid grid-cols-4 gap-2">
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                          <p className="text-[10px] text-gray-400 mb-1">น้ำหนัก</p>
                          <p className="text-sm font-semibold text-gray-700"><span>{data.weight}</span><span className="text-[10px] font-normal ml-0.5">กก.</span></p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                          <p className="text-[10px] text-gray-400 mb-1">ส่วนสูง</p>
                          <p className="text-sm font-semibold text-gray-700"><span>{data.height}</span><span className="text-[10px] font-normal ml-0.5">ซม.</span></p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                          <p className="text-[10px] text-gray-400 mb-1">BMI</p>
                          <p className="text-sm font-semibold text-gray-700">{data.bmi}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                          <p className="text-[10px] text-gray-400 mb-1">รอบเอว</p>
                          <p className="text-sm font-semibold text-gray-700"><span>{data.waist}</span><span className="text-[10px] font-normal ml-0.5">ซม.</span></p>
                      </div>
                  </div>
              </div>
              
              <div>
                  <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 ml-1">ที่อยู่ผู้ป่วย</h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] text-sm">
                      <div>
                          <p className="text-gray-400 text-[10px] font-medium mb-0.5">บ้านเลขที่</p>
                          <p className="font-medium text-gray-800 text-sm">{data.address}</p>
                      </div>
                      <div>
                          <p className="text-gray-400 text-[10px] font-medium mb-0.5">หมู่</p>
                          <p className="font-medium text-gray-800 text-sm">{data.moo}</p>
                      </div>
                      <div>
                          <p className="text-gray-400 text-[10px] font-medium mb-0.5">ตำบล</p>
                          <p className="font-medium text-gray-800 text-sm">{data.subdist}</p>
                      </div>
                      <div>
                          <p className="text-gray-400 text-[10px] font-medium mb-0.5">อำเภอ</p>
                          <p className="font-medium text-gray-800 text-sm">{data.dist}</p>
                      </div>
                      <div className="col-span-2">
                          <p className="text-gray-400 text-[10px] font-medium mb-0.5">จังหวัด</p>
                          <p className="font-medium text-gray-800 text-sm">{data.prov}</p>
                      </div>
                  </div>
              </div>
            </>
          )}

          {/* Drug Detail */}
          {type === 'drug' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-4 flex flex-col border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] group cursor-pointer hover:border-pink-200 transition-colors">
                      <span className="text-[11px] text-gray-400 font-medium mb-2 text-center">รูปถ่ายยาจริง</span>
                      <div className="flex-1 bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-50 p-1">
                          <img src={data.realImg} className="w-full h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" alt="Real Pill Photo" />
                      </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                      <span className="text-[11px] text-gray-400 font-medium mb-2">รูปลักษณ์อ้างอิง</span>
                      <div className="flex-1 flex items-center justify-center w-full">
                          <img src={getPillSVG(data.shapeType, data.colorHex)} className="w-16 h-16 drop-shadow-sm hover:scale-110 transition-transform duration-300" alt="Pill Shape" />
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                          <div className="w-2.5 h-2.5 rounded-full border border-gray-200 shadow-inner" style={{ backgroundColor: data.colorHex }}></div>
                          <span className="text-[11px] font-semibold text-gray-700">{data.colorTxt} {data.shapeTxt}</span>
                      </div>
                  </div>
              </div>

              <div>
                  <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 ml-1">ข้อมูลเชิงลึก</h4>
                  <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4 text-sm">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                          <p className="text-gray-400 font-medium text-[12px]">ขนาดยา (Dosage)</p>
                          <p className="font-semibold text-gray-800 bg-pink-50 text-pink-600 px-3 py-1 rounded-full">{data.dosage}</p>
                      </div>
                      <div className="flex justify-between items-center">
                          <p className="text-gray-400 font-medium text-[12px]">รหัสบาร์โค้ด</p>
                          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                              <Barcode className="w-4 h-4 text-gray-500" />
                              <p className="font-mono font-medium text-gray-700 tracking-wider">{data.barcode}</p>
                          </div>
                      </div>
                  </div>
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-50 flex gap-3 bg-white/90 backdrop-blur-md">
            <button className="flex-1 py-3 px-4 rounded-xl text-pink-600 bg-pink-50 hover:bg-pink-100 font-medium text-sm transition-colors flex items-center justify-center gap-2 outline-none">
                <Edit3 className="w-4 h-4" /> แก้ไขข้อมูล
            </button>
            <button className="w-12 h-12 shrink-0 rounded-xl text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 transition-colors flex items-center justify-center outline-none">
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
      </div>
    </>
  );
};

export default SlidePanel;

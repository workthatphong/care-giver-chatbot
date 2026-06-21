import React from 'react';
import { 
  X, CreditCard, ClipboardList, Users, MapPin, ChevronRight, 
  HeartHandshake, Barcode, Edit3, Trash2, UserMinus 
} from 'lucide-react';
import AccountLinking from './AccountLinking';

const getPillSVG = (shape, colorHex) => {
  let svgContent = '';
  let stroke = (colorHex === '#ffffff' || colorHex.toLowerCase() === '#fff') ? 'stroke="#e2e8f0" stroke-width="4"' : '';
  
  if (shape === 'round-small' || shape === 'round') {
      svgContent = `<circle cx="50" cy="50" r="25" fill="${colorHex}" ${stroke} />`;
  } else if (shape === 'round-large') {
      svgContent = `<circle cx="50" cy="50" r="40" fill="${colorHex}" ${stroke} />`;
  } else if (shape === 'oval-horizontal' || shape === 'oval') {
      svgContent = `<ellipse cx="50" cy="50" rx="45" ry="25" fill="${colorHex}" ${stroke} />`;
  } else if (shape === 'capsule') {
      svgContent = `<rect x="15" y="30" width="70" height="40" rx="20" fill="${colorHex}" ${stroke} />`;
      svgContent += `<line x1="50" y1="30" x2="50" y2="70" stroke="rgba(0,0,0,0.15)" stroke-width="3" />`;
  } else if (shape === 'square-rounded') {
      svgContent = `<rect x="20" y="20" width="60" height="60" rx="16" fill="${colorHex}" ${stroke} />`;
  } else {
      svgContent = `<circle cx="50" cy="50" r="35" fill="${colorHex}" ${stroke} />`;
  }
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${svgContent}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const SlidePanel = ({ detailOpen, setDetailOpen, appData, onEdit, onDelete, onItemClick }) => {
  if (!detailOpen) return null;

  const { type, id } = detailOpen;
  
  let data = null;
  if (type === 'caregiver') data = appData.caregiver.find(c => c.id === id);
  if (type === 'patient') data = appData.patient.find(p => p.id === id);
  if (type === 'drug') data = appData.drug.find(d => d.id === id);
  if (type === 'careplan') data = appData.careplan.find(c => c.id === id);

  if (!data) return null;

  return (
    <>
      <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-[2px] z-40 transition-opacity duration-300" onClick={() => setDetailOpen(null)}></div>
      <div className="absolute inset-y-0 right-0 w-full sm:w-[420px] bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.05)] z-50 transform translate-x-0 transition-transform duration-300 ease-out flex flex-col h-full border-l border-pink-50">
        
        {type === 'careplan' && (
           <button onClick={() => setDetailOpen(null)} className="absolute top-6 right-6 p-2 bg-white rounded-full text-gray-400 hover:text-pink-500 hover:bg-pink-50 shadow-sm border border-gray-50 transition-all focus:outline-none z-10">
               <X className="w-4 h-4" />
           </button>
        )}

        {/* Header */}
        {type !== 'careplan' && (
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
        )}

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
                        {appData.patient.filter(p => p.careGiverId === data.id).length} คน
                      </span>
                  </div>
                  <div className="space-y-3">
                      {appData.patient.filter(p => p.careGiverId === data.id).length > 0 ? (
                        appData.patient.filter(p => p.careGiverId === data.id).map(p => (
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

              {/* Account Linking Part */}
              <AccountLinking linkedAccounts={data.linkedAccounts || []} readOnly={true} />
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

              <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 border border-orange-100 shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31"></path><path d="M14 9.3V1.99"></path><path d="M8.5 2h7"></path><path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path><path d="M5.52 16h12.96"></path></svg>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-800 tracking-wide">เวลาทานยา (Medications)</h4>
                  </div>
                  
                  {data.medications && data.medications.length > 0 ? (
                    <div className="space-y-3">
                      {data.medications.map((med, i) => {
                         const drug = appData.drug.find(d => String(d.id) === String(med.drugId));
                         if (!drug) return null;
                         return (
                           <div 
                              key={i} 
                              onClick={() => onItemClick && onItemClick(drug, 'drug')}
                              className="cursor-pointer bg-white rounded-xl p-4 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex gap-4 items-center group hover:border-orange-300 hover:shadow-[0_4px_16px_rgba(249,115,22,0.08)] transition-all"
                           >
                              <div className="shrink-0 w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 group-hover:bg-white transition-colors">
                                 <img src={getPillSVG(drug.shapeType, drug.colorHex)} alt="pill" className="w-10 h-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <h5 className="font-bold text-gray-800 text-[15px] truncate group-hover:text-orange-600 transition-colors">{drug.name} <span className="text-xs font-medium text-pink-500 bg-pink-50 px-1.5 py-0.5 rounded group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">{drug.dosage}</span></h5>
                                 <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 text-[11px] font-medium text-gray-500">
                                    <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> {med.days.join(', ')}</span>
                                    <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> {med.time}</span>
                                    <span className="flex items-center gap-1 text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> {med.frequency}</span>
                                 </div>
                              </div>
                              <div className="text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                              </div>
                           </div>
                         );
                      })}
                    </div>
                  ) : (
                    <div className="text-center p-6 text-gray-400 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                        <span className="text-[13px] font-medium">ยังไม่มีข้อมูลการจ่ายยา</span>
                    </div>
                  )}
              </div>

              <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 border border-purple-100 shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-800 tracking-wide">แผนการดูแลระยะยาว</h4>
                  </div>
                  
                  {(!data.problems || data.problems.length === 0) && (!data.goals || data.goals.length === 0) ? (
                    <div className="text-center p-6 text-gray-400 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                        <span className="text-[13px] font-medium">ยังไม่มีข้อมูลแผนการดูแลระยะยาว</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                       {/* Problems */}
                       <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-red-200 transition-colors">
                          <h5 className="text-[12px] font-bold text-red-500 mb-3 uppercase tracking-wider flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> ปัญหาและความต้องการ</h5>
                          {data.problems && data.problems.length > 0 ? (
                             <ul className="space-y-2">
                               {data.problems.map((p, i) => (
                                 <li key={i} className="text-[13px] text-gray-700 flex items-start gap-2 font-medium">
                                    <span className="text-red-300 font-bold mt-0.5">•</span> 
                                    <span className="leading-relaxed">{p}</span>
                                 </li>
                               ))}
                             </ul>
                          ) : (
                             <div className="text-[11px] text-gray-400 font-medium">ยังไม่ได้ระบุปัญหา</div>
                          )}
                       </div>

                       {/* Goals */}
                       <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-blue-200 transition-colors">
                          <h5 className="text-[12px] font-bold text-blue-500 mb-3 uppercase tracking-wider flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> เป้าหมายระยะสั้น (ภายใน 3 เดือน)</h5>
                          {data.goals && data.goals.length > 0 ? (
                             <ul className="space-y-2">
                               {data.goals.map((g, i) => (
                                 <li key={i} className="text-[13px] text-gray-700 flex items-start gap-2 font-medium">
                                    <span className="text-blue-300 font-bold mt-0.5">•</span> 
                                    <span className="leading-relaxed">{g}</span>
                                 </li>
                               ))}
                             </ul>
                          ) : (
                             <div className="text-[11px] text-gray-400 font-medium">ยังไม่ได้ระบุเป้าหมาย</div>
                          )}
                       </div>
                    </div>
                  )}
              </div>
            </>
          )}

          {/* Drug Detail */}
          {type === 'drug' && (
            <>
              <div className="flex justify-center">
                  <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] w-full max-w-[200px]">
                      <span className="text-[11px] text-gray-400 font-medium mb-4 uppercase tracking-wider">รูปลักษณ์อ้างอิง</span>
                      <div className="flex items-center justify-center w-full">
                          <img src={getPillSVG(data.shapeType, data.colorHex)} className="w-20 h-20 drop-shadow-md hover:scale-110 transition-transform duration-300" alt="Pill Shape" />
                      </div>
                      <div className="mt-4 flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                          <div className="w-3 h-3 rounded-full border border-gray-200 shadow-inner" style={{ backgroundColor: data.colorHex }}></div>
                          <span className="text-xs font-semibold text-gray-700">{data.colorTxt} {data.shapeTxt}</span>
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

              <div className="mt-8">
                  <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-4 ml-1 flex items-center gap-2">
                     <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center text-green-500 border border-green-100 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                     </div>
                     กลุ่มอาการที่รักษาและบรรเทา
                  </h4>
                  {data.symptoms && data.symptoms.length > 0 ? (
                      <div className="flex flex-wrap gap-2.5">
                          {data.symptoms.map((symptom, i) => (
                              <div key={i} className="px-3.5 py-2 bg-white text-gray-700 border border-gray-100 rounded-xl text-[13px] font-medium shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center gap-2">
                                 <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                 </div>
                                 {symptom}
                              </div>
                          ))}
                      </div>
                  ) : (
                      <div className="text-center p-5 text-gray-400 bg-gray-50 rounded-xl border border-gray-100 border-dashed text-xs flex flex-col items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
                          ยังไม่ได้ระบุกลุ่มอาการ
                      </div>
                  )}
              </div>
            </>
          )}

          {/* Careplan Detail */}
          {type === 'careplan' && (() => {
             const patient = appData.patient.find(p => String(p.id) === String(data.patientId));
             const caregiver = appData.caregiver.find(c => String(c.id) === String(data.careGiverId));
             
             return (
               <>
                 <div className="text-center pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-purple-500 mb-4 shadow-sm border border-purple-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">บันทึกคัดกรอง</h3>
                    <p className="text-[13px] text-gray-500 mt-1">วันที่ {data.date} เวลา {data.time} (ระยะเวลา {data.duration})</p>
                 </div>

                 <div className="mt-6 space-y-6">
                    {/* Patient & Caregiver info */}
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                          <img src={patient?.img} alt="patient" className="w-10 h-10 rounded-full bg-white border border-gray-200" />
                          <div className="min-w-0">
                             <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider truncate">คนไข้ที่ถูกประเมิน</p>
                             <p className="text-[13px] font-semibold text-gray-800 truncate">{patient?.title}{patient?.fname} {patient?.lname}</p>
                          </div>
                       </div>
                       <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                          <img src={caregiver?.img} alt="caregiver" className="w-10 h-10 rounded-full bg-white border border-gray-200" />
                          <div className="min-w-0">
                             <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider truncate">ผู้ประเมิน</p>
                             <p className="text-[13px] font-semibold text-gray-800 truncate">{caregiver?.fname} {caregiver?.lname}</p>
                          </div>
                       </div>
                    </div>

                    {/* Vitals */}
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                       <h4 className="text-[12px] font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div> สัญญาณชีพ (Vital Signs)
                       </h4>
                       <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                          <div>
                             <p className="text-[11px] text-gray-400 mb-1">อุณหภูมิ (Temp)</p>
                             <p className="text-[13px] font-semibold text-gray-800">{data.temp} °C</p>
                          </div>
                          <div>
                             <p className="text-[11px] text-gray-400 mb-1">ชีพจร (HR)</p>
                             <p className="text-[13px] font-semibold text-gray-800">{data.hr} bpm</p>
                          </div>
                          <div>
                             <p className="text-[11px] text-gray-400 mb-1">ความดัน (BP)</p>
                             <p className="text-[13px] font-semibold text-gray-800">{data.bp} mmHg</p>
                          </div>
                          <div>
                             <p className="text-[11px] text-gray-400 mb-1">การหายใจ (RR)</p>
                             <p className="text-[13px] font-semibold text-gray-800">{data.rr} /min</p>
                          </div>
                       </div>
                    </div>

                    {/* Screening Results */}
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                       <h4 className="text-[12px] font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> ผลการประเมิน (Screening)
                       </h4>
                       <div className="space-y-4">
                          <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                             <p className="text-[12px] text-gray-500">คัดกรอง 2Q</p>
                             <p className="text-[13px] font-semibold text-gray-800">{data.screening2Q}</p>
                          </div>
                          <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                             <p className="text-[12px] text-gray-500">ADL วันนี้</p>
                             <p className="text-[13px] font-semibold text-gray-800">{data.adlToday}</p>
                          </div>
                          <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                             <p className="text-[12px] text-gray-500">AMT ความจำ</p>
                             <p className="text-[13px] font-semibold text-gray-800">{data.amt}</p>
                          </div>
                          <div>
                             <p className="text-[12px] text-gray-500 mb-1.5">อาการรวม</p>
                             <p className="text-[13px] font-medium text-gray-800 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">{data.symptomsSummary}</p>
                          </div>
                       </div>
                    </div>

                    {/* Care Details */}
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                       <h4 className="text-[12px] font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> บันทึกการดูแล
                       </h4>
                       <div className="space-y-4">
                          <div>
                             <p className="text-[12px] text-gray-500 mb-1">รายละเอียดบันทึกสภาพทั่วไปและอาการสำคัญ</p>
                             <p className="text-[13px] text-gray-800 leading-relaxed">{data.generalCondition}</p>
                          </div>
                          <div>
                             <p className="text-[12px] text-gray-500 mb-1">กิจกรรมการดูแลที่ปฏิบัติงาน</p>
                             <p className="text-[13px] text-gray-800 leading-relaxed">{data.activitiesPerformed}</p>
                          </div>
                          <div>
                             <p className="text-[12px] text-gray-500 mb-1">ผลประเมินการปฏิบัติการ</p>
                             <p className="text-[13px] text-gray-800 leading-relaxed font-medium">{data.evaluationResult}</p>
                          </div>
                       </div>
                    </div>

                    {/* Pulled from Patient's Long-term care plan */}
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border-t-4 border-t-purple-400">
                       <h4 className="text-[12px] font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                           แผนการดูแลระยะยาว <span className="text-gray-400 text-[10px] font-normal lowercase">(จากข้อมูลผู้ป่วย)</span>
                       </h4>
                       <div className="space-y-5">
                          <div>
                             <h5 className="text-[11px] font-bold text-red-500 mb-2">ปัญหาและความต้องการ</h5>
                             {patient?.problems && patient.problems.length > 0 ? (
                                <ul className="space-y-1.5">
                                  {patient.problems.map((p, i) => (
                                    <li key={i} className="text-[13px] text-gray-700 flex items-start gap-2 font-medium"><span className="text-red-300">•</span> <span className="leading-relaxed">{p}</span></li>
                                  ))}
                                </ul>
                             ) : (
                                <p className="text-[12px] text-gray-400">ไม่มีข้อมูล</p>
                             )}
                          </div>
                          <div>
                             <h5 className="text-[11px] font-bold text-blue-500 mb-2">เป้าหมายระยะสั้น (ภายใน 3 เดือน)</h5>
                             {patient?.goals && patient.goals.length > 0 ? (
                                <ul className="space-y-1.5">
                                  {patient.goals.map((g, i) => (
                                    <li key={i} className="text-[13px] text-gray-700 flex items-start gap-2 font-medium"><span className="text-blue-300">•</span> <span className="leading-relaxed">{g}</span></li>
                                  ))}
                                </ul>
                             ) : (
                                <p className="text-[12px] text-gray-400">ไม่มีข้อมูล</p>
                             )}
                          </div>
                       </div>
                    </div>

                 </div>
               </>
             );
          })()}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-50 flex gap-3 bg-white/90 backdrop-blur-md">
            <button onClick={() => onEdit(type, data)} className="flex-1 py-3 px-4 rounded-xl text-pink-600 bg-pink-50 hover:bg-pink-100 font-medium text-sm transition-colors flex items-center justify-center gap-2 outline-none">
                <Edit3 className="w-4 h-4" /> แก้ไขข้อมูล
            </button>
            <button onClick={() => onDelete(type, data.id, data.title ? `${data.title}${data.fname} ${data.lname}` : data.name)} className="w-12 h-12 shrink-0 rounded-xl text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 transition-colors flex items-center justify-center outline-none">
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
      </div>
    </>
  );
};

export default SlidePanel;

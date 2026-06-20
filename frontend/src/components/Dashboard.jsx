import React from 'react';
import { ArrowRight, Users, HeartHandshake } from 'lucide-react';

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

const Dashboard = ({ currentView, setDetailOpen, appData }) => {
  if (currentView === 'caregiver') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {appData.caregiver.map(cg => (
          <div key={cg.id} onClick={() => setDetailOpen({ type: 'caregiver', id: cg.id })} className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(236,72,153,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-pink-50/60 flex items-center gap-4 group">
             <img src={cg.img} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-gray-100 bg-gray-50" alt="caregiver" />
             <div className="flex-1 min-w-0">
                 <h3 className="text-gray-800 font-medium truncate">{cg.fname} {cg.lname}</h3>
                 <p className="text-[12px] sm:text-[13px] text-gray-400 mt-0.5 truncate flex items-center gap-1.5">
                     <Users className="w-3.5 h-3.5 text-blue-400" /> ดูแล {cg.patients} คน
                 </p>
             </div>
             <div className="w-8 h-8 shrink-0 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors shadow-sm">
                 <ArrowRight className="w-4 h-4" />
             </div>
          </div>
        ))}
      </div>
    );
  }

  if (currentView === 'patient') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {appData.patient.map(pt => (
          <div key={pt.id} onClick={() => setDetailOpen({ type: 'patient', id: pt.id })} className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 flex items-start gap-4 group">
             <img src={pt.img} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-gray-100 bg-gray-50" alt="patient" />
             <div className="flex-1 min-w-0 mt-0.5">
                 <div className="flex justify-between items-start">
                     <h3 className="text-gray-800 font-medium truncate text-sm sm:text-base">{pt.title}{pt.fname} {pt.lname}</h3>
                     <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium ml-2 shrink-0">{pt.age} ปี</span>
                 </div>
                 <div className="flex items-center gap-3 mt-1.5">
                     <div className="flex items-center gap-1 text-[11px] text-gray-500">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> ADL: <span className="font-medium text-gray-700">{pt.adl}</span>
                     </div>
                 </div>
                 <p className="text-[11px] text-gray-400 mt-2 truncate flex items-center gap-1.5 bg-gray-50 py-1 px-2 rounded-md w-fit">
                     <HeartHandshake className="w-3 h-3 text-pink-400" /> {pt.primaryCareGiver}
                 </p>
             </div>
          </div>
        ))}
      </div>
    );
  }

  if (currentView === 'drug') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {appData.drug.map(drug => (
          <div key={drug.id} onClick={() => setDetailOpen({ type: 'drug', id: drug.id })} className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(236,72,153,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 flex items-center gap-4 group">
             <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <img src={getPillSVG(drug.shapeType, drug.colorHex)} className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform" alt="pill" />
             </div>
             <div className="flex-1 min-w-0">
                 <h3 className="text-gray-800 font-semibold truncate text-sm sm:text-base">{drug.name}</h3>
                 <p className="text-[12px] text-gray-500 mt-1 truncate bg-pink-50 text-pink-600 px-2.5 py-0.5 rounded-full w-fit font-medium">
                     {drug.dosage}
                 </p>
             </div>
             <div className="w-8 h-8 shrink-0 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors shadow-sm">
                 <ArrowRight className="w-4 h-4" />
             </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <div className="w-12 h-12 mb-3 text-gray-200"></div>
        <p>ยังไม่มีข้อมูลในส่วนนี้</p>
    </div>
  );
};

export default Dashboard;

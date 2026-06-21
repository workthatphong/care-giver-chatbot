import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Check, UserPlus, Camera } from 'lucide-react';
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

const PatientMedications = ({ formData, setFormData, appData }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newMed, setNewMed] = useState({ drugId: '', days: [], time: '', frequency: '', method: '', notes: '' });

  const toggleDay = (day) => {
    if (day === 'ทุกวัน') {
      setNewMed({ ...newMed, days: ['ทุกวัน'] });
      return;
    }
    
    let updatedDays = newMed.days.filter(d => d !== 'ทุกวัน');
    if (updatedDays.includes(day)) {
      updatedDays = updatedDays.filter(d => d !== day);
    } else {
      updatedDays = [...updatedDays, day];
    }
    setNewMed({ ...newMed, days: updatedDays });
  };

  const editMed = (idx) => {
    setNewMed(formData.medications[idx]);
    setEditingIndex(idx);
    setIsAdding(true);
  };

  const saveMed = () => {
    if (!newMed.drugId) return;
    const meds = [...(formData.medications || [])];
    if (editingIndex !== null) {
      meds[editingIndex] = newMed;
    } else {
      meds.push(newMed);
    }
    setFormData({ ...formData, medications: meds });
    setIsAdding(false);
    setEditingIndex(null);
    setNewMed({ drugId: '', days: [], time: '', frequency: '', method: '', notes: '' });
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setEditingIndex(null);
    setNewMed({ drugId: '', days: [], time: '', frequency: '', method: '', notes: '' });
  };

  const removeMed = (index) => {
    const meds = [...(formData.medications || [])];
    meds.splice(index, 1);
    setFormData({ ...formData, medications: meds });
  };

  const daysOfWeek = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสฯ', 'ศุกร์', 'เสาร์', 'อาทิตย์'];
  const dayShort = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];

  return (
    <div className="col-span-2 mt-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      <div className="flex justify-between items-center mb-4">
        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">เวลาทานยา (Medications)</label>
        {!isAdding && (
          <button type="button" onClick={() => setIsAdding(true)} className="px-3 py-1.5 bg-pink-50 text-pink-600 rounded-lg text-xs font-semibold hover:bg-pink-100 transition-colors">
            + เพิ่มยา
          </button>
        )}
      </div>

      <div className="space-y-3 mb-4">
        {(formData.medications || []).map((med, idx) => {
           const drug = appData.drug.find(d => String(d.id) === String(med.drugId));
           if (!drug) return null;
           return (
             <div key={idx} className="p-3 border border-gray-100 rounded-xl bg-gray-50/50 flex items-center justify-between group">
               <div className="flex items-center gap-3">
                 <img src={getPillSVG(drug.shapeType, drug.colorHex)} alt="pill" className="w-10 h-10 drop-shadow-sm" />
                 <div>
                   <p className="text-sm font-semibold text-gray-800">{drug.name} <span className="text-xs font-medium text-pink-500 bg-pink-50 px-1.5 py-0.5 rounded">{drug.dosage}</span></p>
                   <p className="text-[11px] text-gray-500 mt-1">{med.days.join(', ')} • {med.time} • {med.frequency}</p>
                 </div>
               </div>
               <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button type="button" onClick={() => editMed(idx)} className="text-gray-400 hover:text-blue-500 p-2 outline-none">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                 </button>
                 <button type="button" onClick={() => removeMed(idx)} className="text-gray-400 hover:text-red-500 p-2 outline-none">
                   <X className="w-4 h-4" />
                 </button>
               </div>
             </div>
           )
        })}
      </div>

      {isAdding && (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4 relative animate-popUp">
          <button type="button" onClick={cancelAdding} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
          
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1.5">เลือกยาในระบบ</label>
            <select 
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 bg-white"
              value={newMed.drugId}
              onChange={(e) => setNewMed({...newMed, drugId: e.target.value})}
            >
              <option value="">-- กรุณาเลือกยา --</option>
              {appData.drug.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.dosage})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1.5">วันที่ทานยา</label>
            <div className="flex gap-1.5 flex-wrap">
              <button 
                type="button" 
                onClick={() => toggleDay('ทุกวัน')}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors outline-none ${newMed.days.includes('ทุกวัน') ? 'bg-pink-500 text-white shadow-md border-pink-500' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
              >
                ทุกวัน
              </button>
              {daysOfWeek.map((day, i) => (
                <button 
                  type="button" 
                  key={day}
                  onClick={() => toggleDay(dayShort[i])}
                  className={`w-8 h-8 rounded-full text-[10px] font-bold transition-colors outline-none ${newMed.days.includes(dayShort[i]) ? 'bg-pink-500 text-white shadow-md border-pink-500' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
                >
                  {dayShort[i]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-semibold text-gray-500 mb-1.5">เวลาที่ทานยา (Time)</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 bg-white" value={newMed.time} onChange={e => setNewMed({...newMed, time: e.target.value})}>
                <option value="">-- เลือกมื้อ --</option>
                <option value="มื้อเช้า">มื้อเช้า</option>
                <option value="มื้อกลางวัน">มื้อกลางวัน</option>
                <option value="มื้อเย็น">มื้อเย็น</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-gray-500 mb-1.5">ความถี่ (Frequency)</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 bg-white" value={newMed.frequency} onChange={e => setNewMed({...newMed, frequency: e.target.value})}>
                <option value="">-- เลือกความถี่ --</option>
                <option value="ครั้งละ 1 เม็ด">ครั้งละ 1 เม็ด</option>
                <option value="ครั้งละ 2 เม็ด">ครั้งละ 2 เม็ด</option>
                <option value="ครั้งละ 3 เม็ด">ครั้งละ 3 เม็ด</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-semibold text-gray-500 mb-1.5">วิธีทานยา (Method)</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 bg-white" value={newMed.method} onChange={e => setNewMed({...newMed, method: e.target.value})}>
                <option value="">-- เลือกวิธีทาน --</option>
                <option value="ก่อนอาหาร">ก่อนอาหาร</option>
                <option value="หลังอาหาร">หลังอาหาร</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-gray-500 mb-1.5">บันทึกเสริม (Notes)</label>
              <input type="text" placeholder="ข้อมูลเพิ่มเติม..." className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 bg-white" value={newMed.notes} onChange={e => setNewMed({...newMed, notes: e.target.value})} />
            </div>
          </div>

          <button type="button" onClick={saveMed} disabled={!newMed.drugId || newMed.days.length === 0 || !newMed.time} className="w-full py-2.5 bg-pink-500 text-white rounded-xl text-sm font-semibold hover:bg-pink-600 disabled:opacity-50 transition-colors mt-2 outline-none">
            {editingIndex !== null ? 'บันทึกการแก้ไข' : 'บันทึกรายการยา'}
          </button>

        </div>
      )}
    </div>
  );
};

const PatientCarePlan = ({ formData, setFormData }) => {
  const [newProblem, setNewProblem] = useState('');
  const [newGoal, setNewGoal] = useState('');

  const addProblem = () => {
    if (newProblem.trim()) {
      const arr = formData.problems || [];
      setFormData({ ...formData, problems: [...arr, newProblem.trim()] });
      setNewProblem('');
    }
  };

  const removeProblem = (idx) => {
    const arr = [...(formData.problems || [])];
    arr.splice(idx, 1);
    setFormData({ ...formData, problems: arr });
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      const arr = formData.goals || [];
      setFormData({ ...formData, goals: [...arr, newGoal.trim()] });
      setNewGoal('');
    }
  };

  const removeGoal = (idx) => {
    const arr = [...(formData.goals || [])];
    arr.splice(idx, 1);
    setFormData({ ...formData, goals: arr });
  };

  return (
    <div className="col-span-2 mt-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
      <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">แผนการดูแลระยะยาว (Long-Term Care Plan)</h4>
      
      {/* Problems */}
      <div>
        <label className="block text-[11px] font-medium text-gray-600 mb-2">ปัญหาและความต้องการ</label>
        <div className="flex gap-2 mb-3">
          <input 
            type="text" 
            placeholder="เพิ่มปัญหาหรือความต้องการ..."
            value={newProblem}
            onChange={e => setNewProblem(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addProblem(); } }}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:border-pink-300 focus:bg-white transition-all outline-none"
          />
          <button type="button" onClick={addProblem} className="px-5 py-2.5 rounded-xl bg-pink-50 text-pink-600 text-sm font-semibold hover:bg-pink-100 transition-colors outline-none">
            เพิ่มข้อ
          </button>
        </div>
        {formData.problems && formData.problems.length > 0 ? (
          <div className="space-y-1.5">
            {formData.problems.map((p, i) => (
              <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm group animate-popUp">
                <div className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>
                   <span className="text-[13px] text-gray-700 font-medium leading-relaxed">{p}</span>
                </div>
                <button type="button" onClick={() => removeProblem(i)} className="text-gray-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity outline-none">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-3 text-[11px] text-gray-400 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">ยังไม่ได้ระบุปัญหาและความต้องการ</div>
        )}
      </div>

      {/* Goals */}
      <div>
        <label className="block text-[11px] font-medium text-gray-600 mb-2">เป้าหมายระยะสั้น (ภายใน 3 เดือน)</label>
        <div className="flex gap-2 mb-3">
          <input 
            type="text" 
            placeholder="เพิ่มเป้าหมายระยะสั้น..."
            value={newGoal}
            onChange={e => setNewGoal(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addGoal(); } }}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:border-blue-300 focus:bg-white transition-all outline-none"
          />
          <button type="button" onClick={addGoal} className="px-5 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-sm font-semibold hover:bg-blue-100 transition-colors outline-none">
            เพิ่มข้อ
          </button>
        </div>
        {formData.goals && formData.goals.length > 0 ? (
          <div className="space-y-1.5">
            {formData.goals.map((g, i) => (
              <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm group animate-popUp">
                <div className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                   <span className="text-[13px] text-gray-700 font-medium leading-relaxed">{g}</span>
                </div>
                <button type="button" onClick={() => removeGoal(i)} className="text-gray-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity outline-none">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-3 text-[11px] text-gray-400 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">ยังไม่ได้ระบุเป้าหมาย</div>
        )}
      </div>
    </div>
  );
};

const EditModal = ({ isOpen, onClose, onSave, itemData, type, appData }) => {
  const [formData, setFormData] = useState({});
  const [cgDropdownOpen, setCgDropdownOpen] = useState(false);
  const [ptDropdownOpen, setPtDropdownOpen] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [newSymptom, setNewSymptom] = useState('');
  const [customActivity, setCustomActivity] = useState('');
  
  const cgDropdownRef = useRef(null);
  const ptDropdownRef = useRef(null);

  useEffect(() => {
    if (itemData) {
      setFormData({ ...itemData });
      
      if (type === 'caregiver') {
        const assigned = appData?.patient?.filter(p => p.careGiverId === itemData.id).map(p => p.id) || [];
        setSelectedPatients(assigned);
      }

      if (type === 'careplan' && itemData.activitiesPerformed) {
        const options = [
           "ทำความสะอาดร่างกาย / อาบน้ำ / แปรงฟัน",
           "สระผม / ตัดผม / ตัดเล็บ",
           "ดูแลอาหาร / ให้คำแนะนำอาหารที่เหมาะสม",
           "อาหารทางสายยาง",
           "ยืดเหยียดกล้ามเนื้อ / ฝึกเดิน / บริหารข้อ",
           "ดูแลระบบขับถ่าย / เปลี่ยนผ้าอ้อม",
           "อารมณ์และสติปัญญา / เปิดเพลงให้ฟัง",
           "จัดสิ่งแวดล้อม / ทำความสะอาดเตียงและบริเวณบ้าน",
           "นวด / ประคบ / ฝึกคลายกล้ามเนื้อ",
           "ดูแลรับประทานยาและติดตามอาการข้างเคียง"
        ];
        const parts = itemData.activitiesPerformed.split(',').map(s => s.trim()).filter(Boolean);
        const customParts = parts.filter(p => !options.includes(p));
        setCustomActivity(customParts.join(', '));
      } else {
        setCustomActivity('');
      }
    }
  }, [itemData, type, appData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cgDropdownRef.current && !cgDropdownRef.current.contains(event.target)) {
        setCgDropdownOpen(false);
      }
      if (ptDropdownRef.current && !ptDropdownRef.current.contains(event.target)) {
        setPtDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen || !itemData) return null;

  const handleChange = (e, key) => {
    let val = e.target.value;
    if (typeof itemData[key] === 'number' && !isNaN(val) && val !== '') {
      val = Number(val);
    }
    setFormData({ ...formData, [key]: val });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'drug') {
          setFormData({ ...formData, realImg: reader.result });
        } else {
          setFormData({ ...formData, img: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCareGiverSelect = (cg) => {
    setFormData({ 
      ...formData, 
      primaryCareGiver: `${cg.title || ''}${cg.fname} ${cg.lname}`.trim(),
      careGiverId: cg.id 
    });
    setCgDropdownOpen(false);
  };

  const togglePatient = (ptId) => {
    setSelectedPatients(prev => {
      if (prev.includes(ptId)) return prev.filter(id => id !== ptId);
      return [...prev, ptId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'caregiver') {
      const finalData = { ...formData, patients: selectedPatients.length };
      onSave(type, finalData, { selectedPatientIds: selectedPatients });
    } else {
      onSave(type, formData);
    }
  };

  const addSymptom = () => {
    if (newSymptom.trim() !== '') {
      const currentSymptoms = formData.symptoms || [];
      setFormData({ ...formData, symptoms: [...currentSymptoms, newSymptom.trim()] });
      setNewSymptom('');
    }
  };

  const removeSymptom = (index) => {
    const currentSymptoms = [...(formData.symptoms || [])];
    currentSymptoms.splice(index, 1);
    setFormData({ ...formData, symptoms: currentSymptoms });
  };

  const excludedKeys = ['id', '_type', '_isNew', 'img', 'realImg', 'shapeType', 'colorHex', 'careGiverId', 'linkedAccounts', 'symptoms', 'barcodeImg', 'colorTxt', 'shapeTxt', 'medications', 'problems', 'goals'];
  const fields = Object.keys(itemData).filter(k => !excludedKeys.includes(k));

  const imageSrc = type === 'drug' ? formData.realImg : formData.img;

  const isNew = itemData._isNew;
  const titleText = isNew 
     ? `เพิ่มข้อมูล${type === 'caregiver' ? 'ผู้ดูแล' : type === 'patient' ? 'คนไข้' : type === 'drug' ? 'ยา' : 'ประเมินคัดกรอง'}` 
     : `แก้ไขข้อมูล${type === 'careplan' ? 'ประเมินคัดกรอง' : ` ${itemData.title ? `${itemData.fname}` : itemData.name}`}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] transition-opacity duration-300" onClick={onClose}></div>
      
      <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-lg z-10 animate-popUp flex flex-col max-h-[85vh] border border-gray-100 overflow-visible">
        <div className="flex justify-between items-center p-6 border-b border-gray-50 bg-gray-50/30 rounded-t-3xl">
          <h3 className="text-lg font-semibold text-gray-800">{titleText}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-pink-500 bg-white hover:bg-pink-50 p-2 rounded-full transition-colors shadow-sm border border-gray-100 outline-none">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <form id="edit-form" onSubmit={handleSubmit} className="overflow-y-auto p-6 custom-scrollbar flex-1 bg-white relative">
          
          {/* Profile Picture Upload Section */}
          {type !== 'careplan' && (
            <div className="flex justify-center mb-8">
              <div className={`relative group cursor-pointer ${type === 'drug' ? 'w-48 h-32 rounded-2xl' : 'w-24 h-24 rounded-full'} overflow-hidden shadow-sm bg-gray-50 ring-4 ring-pink-50/50 hover:ring-pink-100 transition-all`}>
                <img src={imageSrc} className="w-full h-full object-cover" alt="Profile" />
                <label className="absolute inset-0 bg-gray-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  <Camera className="w-7 h-7 text-white drop-shadow-md" />
                </label>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {fields.map(key => {
              const isFullWidth = fields.length % 2 !== 0 && key === fields[fields.length - 1];
              
              if (type === 'patient' && key === 'primaryCareGiver') {
                const selectedCg = appData?.caregiver?.find(c => c.id === formData.careGiverId);
                return (
                  <div key={key} className="col-span-2 relative" ref={cgDropdownRef}>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                      ผู้ดูแลรับผิดชอบ (Care Giver)
                    </label>
                    <div 
                      onClick={() => setCgDropdownOpen(!cgDropdownOpen)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-gray-50 cursor-pointer flex items-center justify-between transition-all group"
                    >
                      {selectedCg ? (
                        <div className="flex items-center gap-3">
                          <img src={selectedCg.img} className="w-7 h-7 rounded-full object-cover border border-gray-200 shadow-sm" alt="cg" />
                          <span className="text-sm font-medium text-gray-800">{selectedCg.title}{selectedCg.fname} {selectedCg.lname}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 font-medium">-- เลือกผู้ดูแล --</span>
                      )}
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${cgDropdownOpen ? 'rotate-180 text-pink-500' : 'group-hover:text-gray-600'}`} />
                    </div>

                    {cgDropdownOpen && (
                      <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden animate-[popUp_0.2s_ease-out] py-2 max-h-56 overflow-y-auto custom-scrollbar">
                        {appData?.caregiver?.map(cg => (
                          <div 
                            key={cg.id}
                            onClick={() => handleCareGiverSelect(cg)}
                            className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-pink-50 transition-colors ${formData.careGiverId === cg.id ? 'bg-pink-50/50' : ''}`}
                          >
                            <img src={cg.img} className="w-8 h-8 rounded-full object-cover border border-pink-100" alt="cg" />
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${formData.careGiverId === cg.id ? 'text-pink-600' : 'text-gray-700'}`}>
                                {cg.title}{cg.fname} {cg.lname}
                              </p>
                              <p className="text-[11px] text-gray-400">ดูแลคนไข้ {cg.patients} คน</p>
                            </div>
                            {formData.careGiverId === cg.id && <Check className="w-4 h-4 text-pink-500" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (type === 'caregiver' && key === 'patients') {
                return (
                  <div key={key} className="col-span-2 relative" ref={ptDropdownRef}>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                      คนไข้ในการดูแล (Patients)
                    </label>
                    <div 
                      onClick={() => setPtDropdownOpen(!ptDropdownOpen)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-gray-50 cursor-pointer flex items-center justify-between transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                           <UserPlus className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-800">
                          เลือกคนไข้แล้ว <span className="text-pink-500 font-bold">{selectedPatients.length}</span> คน
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${ptDropdownOpen ? 'rotate-180 text-blue-500' : 'group-hover:text-gray-600'}`} />
                    </div>

                    {ptDropdownOpen && (
                      <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden animate-[popUp_0.2s_ease-out] py-2 max-h-64 overflow-y-auto custom-scrollbar">
                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                           <span className="text-xs font-semibold text-gray-400">รายชื่อคนไข้ทั้งหมดในระบบ</span>
                        </div>
                        {appData?.patient?.map(pt => {
                          const isSelected = selectedPatients.includes(pt.id);
                          const isAssignedToOther = !isSelected && pt.careGiverId && pt.careGiverId !== itemData.id;
                          
                          return (
                            <div 
                              key={pt.id}
                              onClick={() => togglePatient(pt.id)}
                              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-blue-50/50 transition-colors ${isSelected ? 'bg-blue-50/30' : ''}`}
                            >
                              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}>
                                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                              </div>
                              <img src={pt.img} className="w-8 h-8 rounded-full object-cover border border-gray-200" alt="pt" />
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}>
                                  {pt.title}{pt.fname} {pt.lname}
                                </p>
                                {isAssignedToOther && (
                                  <p className="text-[10px] text-orange-500 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                    ถูกดูแลโดย: {pt.primaryCareGiver}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              if (type === 'drug' && key === 'barcode') {
                return (
                  <div key={key} className={isFullWidth ? "col-span-2" : ""}>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">{key}</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={formData[key] || ''} 
                        onChange={(e) => handleChange(e, key)}
                        className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 focus:bg-white focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100/50 transition-all text-sm font-medium"
                      />
                      <label className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-pink-500 transition-colors">
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormData({ ...formData, barcodeImg: reader.result });
                                // Optional: You could also mock a decoded barcode number here if desired.
                              };
                              reader.readAsDataURL(file);
                            }
                          }} 
                        />
                        <Camera className="w-4 h-4" />
                      </label>
                    </div>
                    {/* Optional small preview indicator if image is uploaded */}
                    {formData.barcodeImg && (
                       <p className="text-[10px] text-green-500 mt-1 ml-1 flex items-center gap-1">
                          <Check className="w-3 h-3" /> อัปโหลดรูปบาร์โค้ดสำเร็จ
                       </p>
                    )}
                  </div>
                );
              }

              if (type === 'drug' && key === 'dosage') {
                return (
                  <div key={key} className={isFullWidth ? "col-span-2" : ""}>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">{key}</label>
                    <input 
                      type="text" 
                      list="dosage-presets"
                      value={formData[key] || ''} 
                      onChange={(e) => handleChange(e, key)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 focus:bg-white focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100/50 transition-all text-sm font-medium"
                      placeholder="เริ่มพิมพ์เพื่อดูตัวเลือกขนาดยา..."
                    />
                    <datalist id="dosage-presets">
                      <option value="1000 mg" />
                      <option value="500 mg" />
                      <option value="250 mg" />
                      <option value="100 mg" />
                      <option value="50 mg" />
                      <option value="10 mg" />
                      <option value="5 mg" />
                      <option value="1 ช้อนโต๊ะ" />
                      <option value="1 ช้อนชา" />
                      <option value="1 เม็ด" />
                      <option value="1/2 เม็ด" />
                    </datalist>
                  </div>
                );
              }

              if (type === 'careplan') {
                if (key === 'patientId') {
                  return (
                    <div key={key} className={isFullWidth ? "col-span-2" : ""}>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">คนไข้ (Patient)</label>
                      <select 
                        value={formData.patientId || ''}
                        onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100/50 transition-all text-sm font-medium"
                      >
                        <option value="">-- เลือกคนไข้ --</option>
                        {appData?.patient?.map(pt => (
                          <option key={pt.id} value={pt.id}>{pt.title}{pt.fname} {pt.lname}</option>
                        ))}
                      </select>
                    </div>
                  );
                }
                if (key === 'careGiverId') {
                  return (
                    <div key={key} className={isFullWidth ? "col-span-2" : ""}>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">ผู้ประเมิน (Care Giver)</label>
                      <select 
                        value={formData.careGiverId || ''}
                        onChange={(e) => setFormData({ ...formData, careGiverId: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100/50 transition-all text-sm font-medium"
                      >
                        <option value="">-- เลือกผู้ประเมิน --</option>
                        {appData?.caregiver?.map(cg => (
                          <option key={cg.id} value={cg.id}>{cg.title}{cg.fname} {cg.lname}</option>
                        ))}
                      </select>
                    </div>
                  );
                }
                if (key === 'date') {
                  return (
                    <div key={key} className={isFullWidth ? "col-span-2" : ""}>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">วันที่ประเมิน</label>
                      <input 
                        type="date"
                        value={formData.date || ''}
                        onChange={(e) => handleChange(e, 'date')}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100/50 transition-all text-sm font-medium"
                      />
                    </div>
                  );
                }
                if (key === 'time') {
                  return (
                    <div key={key} className={isFullWidth ? "col-span-2" : ""}>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">เวลา</label>
                      <input 
                        type="time"
                        value={formData.time || ''}
                        onChange={(e) => handleChange(e, 'time')}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100/50 transition-all text-sm font-medium"
                      />
                    </div>
                  );
                }
                if (key === 'screening2Q') {
                  return (
                    <div key={key} className={isFullWidth ? "col-span-2" : ""}>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">คัดกรอง 2Q</label>
                      <select 
                        value={formData.screening2Q || ''}
                        onChange={(e) => setFormData({ ...formData, screening2Q: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100/50 transition-all text-sm font-medium"
                      >
                        <option value="">-- เลือกผลคัดกรอง --</option>
                        <option value="ปกติ">ปกติ</option>
                        <option value="ผิดปกติ">ผิดปกติ</option>
                      </select>
                    </div>
                  );
                }
              }

              if (type === 'careplan' && key === 'activitiesPerformed') {
                const options = [
                  "ทำความสะอาดร่างกาย / อาบน้ำ / แปรงฟัน",
                  "สระผม / ตัดผม / ตัดเล็บ",
                  "ดูแลอาหาร / ให้คำแนะนำอาหารที่เหมาะสม",
                  "อาหารทางสายยาง",
                  "ยืดเหยียดกล้ามเนื้อ / ฝึกเดิน / บริหารข้อ",
                  "ดูแลระบบขับถ่าย / เปลี่ยนผ้าอ้อม",
                  "อารมณ์และสติปัญญา / เปิดเพลงให้ฟัง",
                  "จัดสิ่งแวดล้อม / ทำความสะอาดเตียงและบริเวณบ้าน",
                  "นวด / ประคบ / ฝึกคลายกล้ามเนื้อ",
                  "ดูแลรับประทานยาและติดตามอาการข้างเคียง"
                ];
                
                const currentValue = formData[key] || '';
                const selectedSet = new Set(currentValue.split(',').map(s => s.trim()).filter(Boolean));

                const handleCheckboxChange = (opt, isChecked) => {
                  const newSet = new Set(selectedSet);
                  if (isChecked) {
                    newSet.add(opt);
                  } else {
                    newSet.delete(opt);
                  }
                  
                  const selectedOptions = options.filter(o => newSet.has(o));
                  const finalString = [...selectedOptions, customActivity].filter(Boolean).join(', ');
                  setFormData({ ...formData, [key]: finalString });
                };

                const handleCustomChange = (val) => {
                  setCustomActivity(val);
                  const selectedOptions = options.filter(o => selectedSet.has(o));
                  const finalString = [...selectedOptions, val].filter(Boolean).join(', ');
                  setFormData({ ...formData, [key]: finalString });
                };

                return (
                  <div key={key} className="col-span-2">
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">กิจกรรมการดูแลที่ปฏิบัติงาน</label>
                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-200 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {options.map(opt => (
                          <label key={opt} className="flex items-start gap-2 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              checked={selectedSet.has(opt)}
                              onChange={(e) => handleCheckboxChange(opt, e.target.checked)}
                              className="w-4 h-4 mt-0.5 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-pink-600 transition-colors leading-snug">{opt}</span>
                          </label>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-gray-200 mt-2">
                        <label className="flex flex-col gap-2">
                          <span className="text-sm text-gray-700 font-medium">หรือสามารถระบุเองได้ (อื่นๆ)</span>
                          <input 
                            type="text" 
                            value={customActivity}
                            onChange={(e) => handleCustomChange(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 focus:outline-none focus:border-pink-300 transition-all text-sm"
                            placeholder="ระบุกิจกรรมอื่นๆ (คั่นด้วยลูกน้ำ)..."
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={key} className={isFullWidth ? "col-span-2" : ""}>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">{key}</label>
                  <input 
                    type="text" 
                    value={formData[key] || ''} 
                    onChange={(e) => handleChange(e, key)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 focus:bg-white focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100/50 transition-all text-sm font-medium"
                  />
                </div>
              );
            })}
          </div>

          {type === 'drug' && (
            <div className="col-span-2 space-y-5 mt-4">
              {/* Color and Shape Manual Selection */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                   <span className="text-[11px] text-gray-400 font-medium mb-3">ตัวอย่างรูปลักษณ์อ้างอิง</span>
                   <img src={getPillSVG(formData.shapeType || 'round', formData.colorHex || '#ffffff')} className="w-16 h-16 drop-shadow-md transition-all duration-300" alt="Preview" />
                 </div>
                 
                 <div className="space-y-4">
                    <div>
                       <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">สีอ้างอิง (Color)</label>
                       <div className="flex flex-wrap gap-1.5">
                          {[
                            { text: 'สีขาว', hex: '#ffffff' },
                            { text: 'สีเหลือง', hex: '#fef08a' },
                            { text: 'สีฟ้า', hex: '#bfdbfe' },
                            { text: 'สีเขียว', hex: '#bbf7d0' },
                            { text: 'สีชมพู', hex: '#fbcfe8' },
                            { text: 'สีส้ม', hex: '#fed7aa' },
                            { text: 'สีแดง', hex: '#fecaca' },
                            { text: 'ทูโทน', hex: '#e2e8f0' }
                          ].map(c => (
                            <button 
                              type="button" 
                              key={c.text}
                              onClick={() => setFormData({ ...formData, colorTxt: c.text, colorHex: c.hex })}
                              className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all flex items-center gap-1.5 outline-none ${formData.colorTxt === c.text ? 'border-pink-400 bg-pink-50 text-pink-600 shadow-sm' : 'border-gray-200 bg-white text-gray-500 hover:border-pink-200 hover:bg-pink-50/50'}`}
                            >
                              <div className="w-2.5 h-2.5 rounded-full border border-gray-200 shadow-inner" style={{ backgroundColor: c.hex }}></div>
                              {c.text}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div>
                       <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">รูปทรงอ้างอิง (Shape)</label>
                       <div className="flex flex-wrap gap-1.5">
                          {[
                            { text: 'กลมเล็ก', type: 'round-small' },
                            { text: 'กลมใหญ่', type: 'round-large' },
                            { text: 'วงรีแนวนอน', type: 'oval-horizontal' },
                            { text: 'แคปซูล', type: 'capsule' },
                            { text: 'สี่เหลี่ยมมน', type: 'square-rounded' }
                          ].map(s => (
                            <button 
                              type="button" 
                              key={s.text}
                              onClick={() => setFormData({ ...formData, shapeTxt: s.text, shapeType: s.type })}
                              className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all outline-none ${formData.shapeTxt === s.text ? 'border-pink-400 bg-pink-50 text-pink-600 shadow-sm' : 'border-gray-200 bg-white text-gray-500 hover:border-pink-200 hover:bg-pink-50/50'}`}
                            >
                              {s.text}
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Symptoms Module */}
              <div className="pt-2">
               <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
                 กลุ่มอาการที่รักษาและบรรเทา
               </label>
               <div className="flex gap-2 mb-4">
                 <input 
                   type="text" 
                   placeholder="เช่น ลดไข้, บรรเทาปวด"
                   value={newSymptom}
                   onChange={(e) => setNewSymptom(e.target.value)}
                   onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSymptom(); } }}
                   className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-green-300 focus:ring-4 focus:ring-green-100/50 transition-all text-sm font-medium"
                 />
                 <button type="button" onClick={addSymptom} className="px-5 py-2.5 rounded-xl bg-green-50 text-green-600 font-semibold hover:bg-green-100 transition-colors text-sm shadow-sm outline-none">
                   เพิ่มข้อ
                 </button>
               </div>
               {formData.symptoms && formData.symptoms.length > 0 ? (
                 <div className="flex flex-wrap gap-2">
                   {formData.symptoms.map((symp, i) => (
                     <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 shadow-sm animate-popUp group">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                       {symp}
                       <button type="button" onClick={() => removeSymptom(i)} className="text-gray-300 hover:text-red-500 transition-colors ml-1 outline-none">
                         <X className="w-3.5 h-3.5" />
                       </button>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="text-center p-3 text-[11px] text-gray-400 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                   ยังไม่ได้ระบุอาการ
                 </div>
               )}
            </div>
          </div>
          )}

          {type === 'caregiver' && (
            <AccountLinking 
              linkedAccounts={formData.linkedAccounts || []}
              onChange={(accs) => setFormData({ ...formData, linkedAccounts: accs })}
            />
          )}
           {type === 'patient' && (
             <>
               <PatientMedications formData={formData} setFormData={setFormData} appData={appData} />
               <PatientCarePlan formData={formData} setFormData={setFormData} />
             </>
           )}

        </form>

        <div className="p-6 border-t border-gray-50 flex justify-end gap-3 bg-gray-50/50 rounded-b-3xl">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-white hover:text-gray-800 transition-colors shadow-sm outline-none">
            ยกเลิก
          </button>
          <button type="submit" form="edit-form" className="px-6 py-2.5 rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-600 shadow-[0_4px_14px_rgba(236,72,153,0.25)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.35)] hover:-translate-y-0.5 transition-all outline-none">
            {isNew ? 'เพิ่มข้อมูล' : 'บันทึกข้อมูล'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

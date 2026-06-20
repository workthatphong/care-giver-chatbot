import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Check, UserPlus, Camera } from 'lucide-react';
import AccountLinking from './AccountLinking';

const EditModal = ({ isOpen, onClose, onSave, itemData, type, appData }) => {
  const [formData, setFormData] = useState({});
  const [cgDropdownOpen, setCgDropdownOpen] = useState(false);
  const [ptDropdownOpen, setPtDropdownOpen] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState([]);
  
  const cgDropdownRef = useRef(null);
  const ptDropdownRef = useRef(null);

  useEffect(() => {
    if (itemData) {
      setFormData({ ...itemData });
      
      if (type === 'caregiver') {
        const assigned = appData?.patient?.filter(p => p.careGiverId === itemData.id).map(p => p.id) || [];
        setSelectedPatients(assigned);
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

  const excludedKeys = ['id', '_type', '_isNew', 'img', 'realImg', 'shapeType', 'colorHex', 'careGiverId', 'linkedAccounts'];
  const fields = Object.keys(itemData).filter(k => !excludedKeys.includes(k));

  const imageSrc = type === 'drug' ? formData.realImg : formData.img;

  const isNew = itemData._isNew;
  const titleText = isNew ? `เพิ่มข้อมูล${type === 'caregiver' ? 'ผู้ดูแล' : type === 'patient' ? 'คนไข้' : 'ยา'}` : `แก้ไขข้อมูล ${itemData.title ? `${itemData.fname}` : itemData.name}`;

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
          <div className="flex justify-center mb-8">
            <div className={`relative group cursor-pointer ${type === 'drug' ? 'w-48 h-32 rounded-2xl' : 'w-24 h-24 rounded-full'} overflow-hidden shadow-sm bg-gray-50 ring-4 ring-pink-50/50 hover:ring-pink-100 transition-all`}>
              <img src={imageSrc} className="w-full h-full object-cover" alt="Profile" />
              <label className="absolute inset-0 bg-gray-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <Camera className="w-7 h-7 text-white drop-shadow-md" />
              </label>
            </div>
          </div>

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

          {type === 'caregiver' && (
            <AccountLinking 
              linkedAccounts={formData.linkedAccounts || []}
              onChange={(accs) => setFormData({ ...formData, linkedAccounts: accs })}
            />
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

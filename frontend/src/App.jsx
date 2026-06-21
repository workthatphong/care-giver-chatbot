import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SlidePanel from './components/SlidePanel';
import EditModal from './components/EditModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

function App() {
  const [currentView, setCurrentView] = useState('caregiver');
  const [detailOpen, setDetailOpen] = useState(null);
  
  const [appData, setAppData] = useState({
    caregiver: [],
    patient: [],
    drug: [],
    careplan: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ดึงข้อมูลจริงจาก /api ซึ่งจะเลือกใช้ Local SQLite หรือ Supabase ให้อัตโนมัติ
    fetch('/api')
      .then(res => res.json())
      .then(result => {
        if (result.data) {
          setAppData(prev => ({
            ...prev,
            caregiver: result.data.careGivers || [],
            patient: result.data.patients || [],
            drug: result.data.drugs || []
          }));
        }
      })
      .catch(error => {
        console.error("Failed to load data from API:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const [editModal, setEditModal] = useState({ isOpen: false, item: null });

  // ฟังก์ชันกลางสำหรับเรียก API ไปทำการบันทึกข้อมูล
  const callApi = async (action, type, payload = null, id = null) => {
    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, type, payload, id })
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || result.message || "Unknown error");
      }
      return result;
    } catch (error) {
      console.error("API Call Failed:", error);
      alert("เกิดข้อผิดพลาดในการบันทึก: " + error.message);
      throw error;
    }
  };

  const getEmptyTemplate = (type) => {
    if (type === 'caregiver') {
      return { id: Date.now(), title: '', fname: '', lname: '', carePlans: 0, nid: '', address: '', moo: '', subdist: '', dist: '', prov: '', patients: 0, img: 'https://placehold.co/150x150/fce7f3/db2777?text=%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88' };
    }
    if (type === 'patient') {
      return { id: Date.now(), title: '', fname: '', lname: '', age: 0, nid: '', adl: 0, ltcGroup: '', frequency: '', weight: 0, height: 0, bmi: 0, waist: 0, address: '', moo: '', subdist: '', dist: '', prov: '', primaryCareGiver: '', careGiverId: null, img: 'https://placehold.co/150x150/e0f2fe/0284c7?text=%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88', medications: [], problems: [], goals: [] };
    }
    if (type === 'drug') {
      return { id: Date.now(), name: '', dosage: '', barcode: '', colorTxt: '', colorHex: '#ffffff', shapeTxt: '', shapeType: 'round', realImg: 'https://placehold.co/300x200/f8fafc/94a3b8?text=%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88', symptoms: [] };
    }
    if (type === 'careplan') {
      return { id: Date.now(), patientId: '', careGiverId: '', date: '', time: '', duration: '', symptomsSummary: '', temp: '', hr: '', rr: '', bp: '', screening2Q: '', adlToday: '', amt: '', generalCondition: '', activitiesPerformed: '', evaluationResult: '' };
    }
    return {};
  };

  const handleAdd = (type) => {
    setEditModal({ isOpen: true, item: { ...getEmptyTemplate(type), _type: type, _isNew: true } });
  };

  const handleEdit = (type, data) => {
    setEditModal({ isOpen: true, item: { ...data, _type: type } });
  };

  const handleDelete = (type, id, name) => {
    setDeleteModal({ isOpen: true, item: { type, id, name } });
  };

  const confirmDelete = async () => {
    const { type, id } = deleteModal.item;
    try {
      await callApi('delete', type, null, id);
      setAppData(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.id !== id)
      }));
      setDetailOpen(null); // Close panel after delete
      setDeleteModal({ isOpen: false, item: null });
    } catch (error) {
      // แจ้งเตือน Error ทำงานแล้วใน callApi
    }
  };

  const saveEdit = async (type, updatedData, relationalUpdates) => {
    try {
      const isNew = updatedData._isNew;
      let payload = { ...updatedData };
      if (isNew) {
        delete payload.id; // ให้ DB สร้าง ID อัตโนมัติ
      }

      const res = await callApi(isNew ? 'create' : 'update', type, payload, isNew ? null : payload.id);
      
      // ดึง Data ที่ถูกสร้างแล้วกลับมาจาก API (เพื่อจะได้ ID จริงจาก DB)
      const savedData = res.data ? res.data : updatedData;
      // ลบ flag พิเศษก่อนใส่ State
      delete savedData._isNew;
      delete savedData._type;

      setAppData(prev => {
        let newState = { ...prev };
        
        if (isNew) {
          newState[type] = [...newState[type], savedData];
        } else {
          newState[type] = newState[type].map(item => item.id === savedData.id ? savedData : item);
        }
        
        if (type === 'caregiver' && relationalUpdates?.selectedPatientIds) {
          newState.patient = newState.patient.map(p => {
            if (relationalUpdates.selectedPatientIds.includes(p.id)) {
              return { ...p, careGiverId: savedData.id, primaryCareGiver: `${savedData.title || ''}${savedData.fname} ${savedData.lname}`.trim() };
            } else if (p.careGiverId === savedData.id) {
              return { ...p, careGiverId: null, primaryCareGiver: '-' };
            }
            return p;
          });
        }
        
        return newState;
      });
      setEditModal({ isOpen: false, item: null });
    } catch (error) {
      // แจ้งเตือน Error ทำงานแล้วใน callApi
    }
  };

  const handleItemClick = (item, type) => {
    setDetailOpen({ type, id: item.id });
  };

  return (
    <div className="flex h-screen w-full text-gray-700 font-sans relative">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 relative flex flex-col transition-all duration-300 overflow-hidden bg-transparent">
        <div className="flex-1 flex flex-col h-full w-full bg-white">
          <Header currentView={currentView} onAdd={() => handleAdd(currentView)} />
          <div className="flex-1 overflow-y-auto px-8 pb-8 sm:px-12 sm:pb-12 custom-scrollbar relative">
            <Dashboard currentView={currentView} setDetailOpen={setDetailOpen} appData={appData} />
          </div>
        </div>
        <SlidePanel 
          detailOpen={detailOpen} 
          setDetailOpen={setDetailOpen} 
          appData={appData} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          onItemClick={handleItemClick}
        />
      </main>

      <DeleteConfirmModal 
        isOpen={deleteModal.isOpen} 
        onClose={() => setDeleteModal({ isOpen: false, item: null })} 
        onConfirm={confirmDelete} 
        itemName={deleteModal.item?.name} 
      />
      
      <EditModal 
        isOpen={editModal.isOpen} 
        onClose={() => setEditModal({ isOpen: false, item: null })} 
        onSave={saveEdit} 
        itemData={editModal.item} 
        type={editModal.item?._type}
        appData={appData}
      />
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

export default function EducationAdmin() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdu, setCurrentEdu] = useState(null);
  
  const [formData, setFormData] = useState({
    icon: '🎓',
    score: '',
    degree: '',
    school: '',
    year: '',
    order: 0 // to control sorting
  });

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'education'));
      const eduList = [];
      querySnapshot.forEach((doc) => {
        eduList.push({ id: doc.id, ...doc.data() });
      });
      // Sort by order
      eduList.sort((a, b) => (a.order || 0) - (b.order || 0));
      setEducation(eduList);
    } catch (err) {
      console.error("Error fetching education", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNew = () => {
    setCurrentEdu(null);
    setFormData({
      icon: '🎓',
      score: '',
      degree: '',
      school: '',
      year: '',
      order: education.length
    });
    setIsEditing(true);
  };

  const handleEdit = (edu) => {
    setCurrentEdu(edu);
    setFormData({
      icon: edu.icon || '🎓',
      score: edu.score || '',
      degree: edu.degree || '',
      school: edu.school || '',
      year: edu.year || '',
      order: edu.order || 0
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      try {
        await deleteDoc(doc(db, 'education', id));
        fetchEducation();
      } catch (err) {
        console.error("Error deleting document: ", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eduData = {
        ...formData,
        order: Number(formData.order)
      };

      if (currentEdu) {
        await updateDoc(doc(db, 'education', currentEdu.id), eduData);
      } else {
        await addDoc(collection(db, 'education'), eduData);
      }
      
      setIsEditing(false);
      fetchEducation();
    } catch (err) {
      console.error("Error saving document: ", err);
    }
  };

  if (loading && !isEditing && education.length === 0) {
    return <div className="text-gray-500">Loading education...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Manage Education</h1>
        {!isEditing && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
          >
            <FiPlus /> Add Education
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">{currentEdu ? 'Edit Education' : 'New Education'}</h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree / Certificate *</label>
                <input
                  type="text"
                  name="degree"
                  required
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">School / Institution *</label>
                <input
                  type="text"
                  name="school"
                  required
                  value={formData.school}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Score / CGPA *</label>
                <input
                  type="text"
                  name="score"
                  required
                  placeholder="e.g. CGPA 7.75"
                  value={formData.score}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Year / Period *</label>
                <input
                  type="text"
                  name="year"
                  required
                  placeholder="2019 - 2023"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji)</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order (0 is first)</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <FiSave /> Save Education
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {education.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No education entries found. Add your background to get started.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {education.map((edu) => (
                <li key={edu.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4">
                  <div className="flex-1 flex gap-4 items-start">
                    <div className="text-3xl bg-gray-100 h-12 w-12 flex items-center justify-center rounded-full shrink-0">
                      {edu.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.school} • {edu.year}</p>
                      <span className="inline-block mt-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        {edu.score}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(edu)}
                      className="p-2 text-gray-400 hover:text-indigo-600 transition-colors border border-transparent hover:border-indigo-100 hover:bg-indigo-50 rounded"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(edu.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors border border-transparent hover:border-red-100 hover:bg-red-50 rounded"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

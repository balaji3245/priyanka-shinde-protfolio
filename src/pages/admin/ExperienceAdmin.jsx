import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    period: '',
    logo: '💼',
    isActive: false,
    points: '',
    tags: ''
  });

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'experience'));
      const exps = [];
      querySnapshot.forEach((doc) => {
        exps.push({ id: doc.id, ...doc.data() });
      });
      setExperiences(exps);
    } catch (err) {
      console.error("Error fetching experiences", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddNew = () => {
    setCurrentExp(null);
    setFormData({
      title: '',
      company: '',
      period: '',
      logo: '💼',
      isActive: false,
      points: '',
      tags: ''
    });
    setIsEditing(true);
  };

  const handleEdit = (exp) => {
    setCurrentExp(exp);
    // Convert array back to newline separated string for textarea
    const pointsText = Array.isArray(exp.points) 
      ? exp.points.join('\n') 
      : (exp.points || '');
      
    const tagsText = Array.isArray(exp.tags) 
      ? exp.tags.join(', ') 
      : (exp.tags || '');

    setFormData({
      title: exp.title || '',
      company: exp.company || '',
      period: exp.period || '',
      logo: exp.logo || '💼',
      isActive: exp.isActive || false,
      points: pointsText,
      tags: tagsText
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteDoc(doc(db, 'experience', id));
        fetchExperiences();
      } catch (err) {
        console.error("Error deleting document: ", err);
        alert("Failed to delete experience");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Split by newline and filter empty lines
      const pointsArray = formData.points.split('\n').map(p => p.trim()).filter(Boolean);
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);

      const expData = {
        title: formData.title,
        company: formData.company,
        period: formData.period,
        logo: formData.logo,
        isActive: formData.isActive,
        points: pointsArray,
        tags: tagsArray
      };

      if (currentExp) {
        // Update existing
        await updateDoc(doc(db, 'experience', currentExp.id), expData);
      } else {
        // Add new
        await addDoc(collection(db, 'experience'), expData);
      }
      
      setIsEditing(false);
      fetchExperiences();
    } catch (err) {
      console.error("Error saving document: ", err);
      alert("Failed to save experience");
    }
  };

  if (loading && !isEditing && experiences.length === 0) {
    return <div className="text-gray-500">Loading experiences...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Manage Experience</h1>
        {!isEditing && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
          >
            <FiPlus /> Add Experience
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">{currentExp ? 'Edit Experience' : 'New Experience'}</h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Company / Institution *</label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Period (e.g., June 2023 - Present) *</label>
                <input
                  type="text"
                  name="period"
                  required
                  value={formData.period}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo / Emoji</label>
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bullet Points (Enter one point per line)
                </label>
                <textarea
                  name="points"
                  rows="4"
                  value={formData.points}
                  onChange={handleInputChange}
                  placeholder="Mentored 100+ students...&#10;Organized hackathons..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills / Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Java, C++, Curriculum Design"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm font-medium text-gray-900">
                Currently Active Role (Shows the green pulsing dot)
              </label>
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
                <FiSave /> Save Experience
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {experiences.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No experiences found. Create your first role to get started.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {experiences.map((exp) => (
                <li key={exp.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl mr-2">{exp.logo}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                      {exp.isActive && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{exp.company} <span className="text-gray-400 font-normal ml-2">| {exp.period}</span></p>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:ml-4 sm:flex-shrink-0">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="p-2 text-gray-400 hover:text-indigo-600 transition-colors border border-transparent hover:border-indigo-100 hover:bg-indigo-50 rounded"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
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

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkillCat, setCurrentSkillCat] = useState(null);
  
  const [formData, setFormData] = useState({
    icon: '☕',
    title: '',
    skillsList: '',
    order: 0
  });

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'skills'));
      const skillsList = [];
      querySnapshot.forEach((doc) => {
        skillsList.push({ id: doc.id, ...doc.data() });
      });
      // Sort by order
      skillsList.sort((a, b) => (a.order || 0) - (b.order || 0));
      setSkills(skillsList);
    } catch (err) {
      console.error("Error fetching skills", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNew = () => {
    setCurrentSkillCat(null);
    setFormData({
      icon: '☕',
      title: '',
      skillsList: '',
      order: skills.length
    });
    setIsEditing(true);
  };

  const handleEdit = (cat) => {
    setCurrentSkillCat(cat);
    
    const skillsText = Array.isArray(cat.skills) 
      ? cat.skills.join(', ') 
      : (cat.skills || '');

    setFormData({
      icon: cat.icon || '☕',
      title: cat.title || '',
      skillsList: skillsText,
      order: cat.order || 0
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill category?')) {
      try {
        await deleteDoc(doc(db, 'skills', id));
        fetchSkills();
      } catch (err) {
        console.error("Error deleting document: ", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = formData.skillsList.split(',').map(s => s.trim()).filter(Boolean);

      const catData = {
        icon: formData.icon,
        title: formData.title,
        skills: skillsArray,
        order: Number(formData.order)
      };

      if (currentSkillCat) {
        await updateDoc(doc(db, 'skills', currentSkillCat.id), catData);
      } else {
        await addDoc(collection(db, 'skills'), catData);
      }
      
      setIsEditing(false);
      fetchSkills();
    } catch (err) {
      console.error("Error saving document: ", err);
    }
  };

  if (loading && !isEditing && skills.length === 0) {
    return <div className="text-gray-500">Loading skills...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Manage Skills</h1>
        {!isEditing && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
          >
            <FiPlus /> Add Skill Category
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">{currentSkillCat ? 'Edit Category' : 'New Category'}</h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Programming Languages"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji) *</label>
                <input
                  type="text"
                  name="icon"
                  required
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated) *</label>
                <input
                  type="text"
                  name="skillsList"
                  required
                  placeholder="Java, Python, JavaScript, C++"
                  value={formData.skillsList}
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
                <FiSave /> Save Category
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {skills.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No skills found. Add your tech stack to get started.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {skills.map((cat) => (
                <li key={cat.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <span className="mr-2">{cat.icon}</span>
                      {cat.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(cat.skills) && cat.skills.map(skill => (
                        <span key={skill} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="p-2 text-gray-400 hover:text-indigo-600 transition-colors border border-transparent hover:border-indigo-100 hover:bg-indigo-50 rounded"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
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

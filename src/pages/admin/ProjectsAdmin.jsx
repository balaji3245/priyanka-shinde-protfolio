import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    stack: '',
    github: '',
    demo: '',
    isFeatured: false,
    emoji: '🚀',
    bg: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)' // Default gradient for featured
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projs = [];
      querySnapshot.forEach((doc) => {
        projs.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projs);
    } catch (err) {
      console.error("Error fetching projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddNew = () => {
    setCurrentProject(null);
    setFormData({
      title: '',
      desc: '',
      stack: '',
      github: '',
      demo: '',
      isFeatured: false,
      emoji: '🚀',
      bg: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)'
    });
    setIsEditing(true);
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title || '',
      desc: project.desc || '',
      stack: Array.isArray(project.stack) ? project.stack.join(', ') : (project.stack || ''),
      github: project.github || '',
      demo: project.demo || '',
      isFeatured: project.isFeatured || false,
      emoji: project.emoji || '🚀',
      bg: project.bg || 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)'
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        fetchProjects();
      } catch (err) {
        console.error("Error deleting document: ", err);
        alert("Failed to delete project");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        stack: formData.stack.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (currentProject) {
        // Update existing
        const projectRef = doc(db, 'projects', currentProject.id);
        await updateDoc(projectRef, projectData);
      } else {
        // Add new
        await addDoc(collection(db, 'projects'), projectData);
      }
      
      setIsEditing(false);
      fetchProjects();
    } catch (err) {
      console.error("Error saving document: ", err);
      alert("Failed to save project");
    }
  };

  if (loading && !isEditing && projects.length === 0) {
    return <div className="text-gray-500">Loading projects...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Manage Projects</h1>
        {!isEditing && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
          >
            <FiPlus /> Add New Project
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">{currentProject ? 'Edit Project' : 'New Project'}</h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack (comma separated) *</label>
                <input
                  type="text"
                  name="stack"
                  required
                  placeholder="React, Node.js, MongoDB"
                  value={formData.stack}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="desc"
                  required
                  rows="3"
                  value={formData.desc}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo Link</label>
                <input
                  type="url"
                  name="demo"
                  value={formData.demo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mt-6">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isFeatured" className="ml-2 block text-sm font-medium text-gray-900">
                  Featured Project (Shows up larger on the portfolio with an image gradient)
                </label>
              </div>

              {formData.isFeatured && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emoji Icon</label>
                    <input
                      type="text"
                      name="emoji"
                      value={formData.emoji}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gradient Background (CSS value)</label>
                    <input
                      type="text"
                      name="bg"
                      value={formData.bg}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              )}
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
                <FiSave /> Save Project
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {projects.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No projects found. Create your first project to get started.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {projects.map((project) => (
                <li key={project.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                      {project.isFeatured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{project.desc}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Array.isArray(project.stack) && project.stack.map(tech => (
                        <span key={tech} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:ml-4 sm:flex-shrink-0">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-gray-400 hover:text-indigo-600 transition-colors border border-transparent hover:border-indigo-100 hover:bg-indigo-50 rounded"
                      title="Edit Project"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors border border-transparent hover:border-red-100 hover:bg-red-50 rounded"
                      title="Delete Project"
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

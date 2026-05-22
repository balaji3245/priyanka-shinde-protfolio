import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiCode } from 'react-icons/fi';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '', desc: '', stack: '', github: '', demo: '',
    isFeatured: false, emoji: '🚀', bg: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)'
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'projects'));
      const projs = [];
      snap.forEach(d => projs.push({ id: d.id, ...d.data() }));
      setProjects(projs);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const openAdd = () => {
    setCurrentProject(null);
    setFormData({ title: '', desc: '', stack: '', github: '', demo: '', isFeatured: false, emoji: '🚀', bg: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)' });
    setIsEditing(true);
  };

  const openEdit = p => {
    setCurrentProject(p);
    setFormData({ title: p.title || '', desc: p.desc || '', stack: Array.isArray(p.stack) ? p.stack.join(', ') : (p.stack || ''), github: p.github || '', demo: p.demo || '', isFeatured: p.isFeatured || false, emoji: p.emoji || '🚀', bg: p.bg || '' });
    setIsEditing(true);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this project?')) return;
    try { await deleteDoc(doc(db, 'projects', id)); fetchProjects(); }
    catch (err) { alert('Failed to delete'); }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = { ...formData, stack: formData.stack.split(',').map(s => s.trim()).filter(Boolean) };
      if (currentProject) await updateDoc(doc(db, 'projects', currentProject.id), data);
      else await addDoc(collection(db, 'projects'), data);
      setIsEditing(false); fetchProjects();
    } catch (err) { alert('Failed to save'); }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Projects</h1>
          <p className="admin-page-subtitle">Manage your portfolio projects</p>
        </div>
        {!isEditing && (
          <button className="admin-btn-primary" onClick={openAdd}>
            <FiPlus /> Add Project
          </button>
        )}
      </div>

      {/* Stats */}
      {!isEditing && (
        <div className="admin-stats-row">
          <div className="admin-stat-card">
            <div className="admin-stat-card__icon">🚀</div>
            <div className="admin-stat-card__num">{projects.length}</div>
            <div className="admin-stat-card__label">Total Projects</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__icon">⭐</div>
            <div className="admin-stat-card__num">{projects.filter(p => p.isFeatured).length}</div>
            <div className="admin-stat-card__label">Featured</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__icon">📁</div>
            <div className="admin-stat-card__num">{projects.filter(p => !p.isFeatured).length}</div>
            <div className="admin-stat-card__label">Other Projects</div>
          </div>
        </div>
      )}

      {isEditing ? (
        <div className="admin-form-card">
          <div className="admin-form-card__header">
            <h2 className="admin-form-card__title">{currentProject ? '✏️ Edit Project' : '➕ New Project'}</h2>
            <button onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 20 }}>
              <FiX />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-card__body">
              <div className="admin-form-grid">
                <div className="admin-form-field">
                  <label className="admin-form-label">Project Title *</label>
                  <input name="title" required value={formData.title} onChange={onChange} className="admin-form-input" placeholder="My Awesome Project" />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Tech Stack (comma separated) *</label>
                  <input name="stack" required value={formData.stack} onChange={onChange} className="admin-form-input" placeholder="React, Node.js, MongoDB" />
                </div>
                <div className="admin-form-field span-2">
                  <label className="admin-form-label">Description *</label>
                  <textarea name="desc" required rows="3" value={formData.desc} onChange={onChange} className="admin-form-textarea" placeholder="What does this project do?" />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">GitHub Link</label>
                  <input name="github" type="url" value={formData.github} onChange={onChange} className="admin-form-input" placeholder="https://github.com/..." />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Live Demo Link</label>
                  <input name="demo" type="url" value={formData.demo} onChange={onChange} className="admin-form-input" placeholder="https://..." />
                </div>
                <div className="admin-form-field span-2">
                  <div className="admin-toggle-row">
                    <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={onChange} style={{ width: 16, height: 16, accentColor: '#6366f1' }} />
                    <label htmlFor="isFeatured" className="admin-toggle-label">⭐ Featured Project — shown as a large card with gradient preview</label>
                  </div>
                </div>
                {formData.isFeatured && (
                  <>
                    <div className="admin-form-field">
                      <label className="admin-form-label">Emoji Icon</label>
                      <input name="emoji" value={formData.emoji} onChange={onChange} className="admin-form-input" />
                    </div>
                    <div className="admin-form-field">
                      <label className="admin-form-label">Gradient Background (CSS)</label>
                      <input name="bg" value={formData.bg} onChange={onChange} className="admin-form-input" />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="admin-form-footer">
              <button type="button" className="admin-btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              <button type="submit" className="admin-btn-primary"><FiSave /> Save Project</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-table-card">
          <div className="admin-table-card__header">
            <div>
              <span className="admin-table-card__title">All Projects</span>
              <span className="admin-table-card__count">({projects.length})</span>
            </div>
          </div>
          {loading ? (
            <div className="admin-loading"><div className="admin-spinner" /><span>Loading...</span></div>
          ) : projects.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty__icon">🚀</div>
              <div className="admin-empty__title">No projects yet</div>
              <div className="admin-empty__desc">Click "Add Project" to create your first one.</div>
            </div>
          ) : (
            projects.map(proj => (
              <div key={proj.id} className="admin-row">
                <div style={{ fontSize: 28, flexShrink: 0 }}>{proj.emoji || '📁'}</div>
                <div className="admin-row__info">
                  <div className="admin-row__title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {proj.title}
                    {proj.isFeatured && <span className="admin-badge featured">Featured</span>}
                  </div>
                  <div className="admin-row__meta">{proj.desc}</div>
                  <div className="admin-pill-list" style={{ marginTop: 6 }}>
                    {Array.isArray(proj.stack) && proj.stack.slice(0, 5).map(t => <span key={t} className="admin-pill">{t}</span>)}
                  </div>
                </div>
                <div className="admin-row__actions">
                  <button className="admin-action-btn edit" title="Edit" onClick={() => openEdit(proj)}><FiEdit2 /></button>
                  <button className="admin-action-btn delete" title="Delete" onClick={() => handleDelete(proj.id)}><FiTrash2 /></button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

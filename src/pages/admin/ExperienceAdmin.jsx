import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  const [formData, setFormData] = useState({ title: '', company: '', period: '', logo: '💼', isActive: false, points: '', tags: '' });

  const fetch_ = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'experience'));
      const list = []; snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      setExperiences(list);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const openAdd = () => { setCurrentExp(null); setFormData({ title: '', company: '', period: '', logo: '💼', isActive: false, points: '', tags: '' }); setIsEditing(true); };
  const openEdit = e => {
    setCurrentExp(e);
    setFormData({ title: e.title || '', company: e.company || '', period: e.period || '', logo: e.logo || '💼', isActive: e.isActive || false, points: Array.isArray(e.points) ? e.points.join('\n') : '', tags: Array.isArray(e.tags) ? e.tags.join(', ') : '' });
    setIsEditing(true);
  };
  const handleDelete = async id => {
    if (!window.confirm('Delete this experience?')) return;
    await deleteDoc(doc(db, 'experience', id)); fetch_();
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const data = { ...formData, points: formData.points.split('\n').map(p => p.trim()).filter(Boolean), tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) };
    if (currentExp) await updateDoc(doc(db, 'experience', currentExp.id), data);
    else await addDoc(collection(db, 'experience'), data);
    setIsEditing(false); fetch_();
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Experience</h1>
          <p className="admin-page-subtitle">Your work history and roles</p>
        </div>
        {!isEditing && <button className="admin-btn-primary" onClick={openAdd}><FiPlus /> Add Role</button>}
      </div>

      {!isEditing && (
        <div className="admin-stats-row">
          <div className="admin-stat-card"><div className="admin-stat-card__icon">💼</div><div className="admin-stat-card__num">{experiences.length}</div><div className="admin-stat-card__label">Total Roles</div></div>
          <div className="admin-stat-card"><div className="admin-stat-card__icon">🟢</div><div className="admin-stat-card__num">{experiences.filter(e => e.isActive).length}</div><div className="admin-stat-card__label">Currently Active</div></div>
        </div>
      )}

      {isEditing ? (
        <div className="admin-form-card">
          <div className="admin-form-card__header">
            <h2 className="admin-form-card__title">{currentExp ? '✏️ Edit Role' : '➕ New Role'}</h2>
            <button onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 20 }}><FiX /></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-card__body">
              <div className="admin-form-grid">
                <div className="admin-form-field">
                  <label className="admin-form-label">Job Title *</label>
                  <input name="title" required value={formData.title} onChange={onChange} className="admin-form-input" placeholder="Assistant Professor" />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Company / Institution *</label>
                  <input name="company" required value={formData.company} onChange={onChange} className="admin-form-input" placeholder="SVM Polytechnic College" />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Period *</label>
                  <input name="period" required value={formData.period} onChange={onChange} className="admin-form-input" placeholder="June 2023 – Present" />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Emoji / Logo</label>
                  <input name="logo" value={formData.logo} onChange={onChange} className="admin-form-input" />
                </div>
                <div className="admin-form-field span-2">
                  <label className="admin-form-label">Bullet Points (one per line)</label>
                  <textarea name="points" rows="5" value={formData.points} onChange={onChange} className="admin-form-textarea" placeholder="Mentored 100+ students...&#10;Organized hackathons..." />
                </div>
                <div className="admin-form-field span-2">
                  <label className="admin-form-label">Skills / Tags (comma separated)</label>
                  <input name="tags" value={formData.tags} onChange={onChange} className="admin-form-input" placeholder="Java, C++, Curriculum Design" />
                </div>
                <div className="admin-form-field span-2">
                  <div className="admin-toggle-row">
                    <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={onChange} style={{ width: 16, height: 16, accentColor: '#6366f1' }} />
                    <label htmlFor="isActive" className="admin-toggle-label">🟢 Currently Active Role (shows pulsing green dot)</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-form-footer">
              <button type="button" className="admin-btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              <button type="submit" className="admin-btn-primary"><FiSave /> Save Role</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-table-card">
          <div className="admin-table-card__header">
            <div><span className="admin-table-card__title">All Roles</span><span className="admin-table-card__count">({experiences.length})</span></div>
          </div>
          {loading ? (
            <div className="admin-loading"><div className="admin-spinner" /><span>Loading...</span></div>
          ) : experiences.length === 0 ? (
            <div className="admin-empty"><div className="admin-empty__icon">💼</div><div className="admin-empty__title">No roles added</div><div className="admin-empty__desc">Add your work history to get started.</div></div>
          ) : (
            experiences.map(exp => (
              <div key={exp.id} className="admin-row">
                <div style={{ fontSize: 28, flexShrink: 0 }}>{exp.logo || '💼'}</div>
                <div className="admin-row__info">
                  <div className="admin-row__title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {exp.title}
                    {exp.isActive && <span className="admin-badge active">🟢 Active</span>}
                  </div>
                  <div className="admin-row__meta">{exp.company} &nbsp;·&nbsp; {exp.period}</div>
                  <div className="admin-pill-list" style={{ marginTop: 6 }}>
                    {Array.isArray(exp.tags) && exp.tags.slice(0, 4).map(t => <span key={t} className="admin-pill">{t}</span>)}
                  </div>
                </div>
                <div className="admin-row__actions">
                  <button className="admin-action-btn edit" onClick={() => openEdit(exp)}><FiEdit2 /></button>
                  <button className="admin-action-btn delete" onClick={() => handleDelete(exp.id)}><FiTrash2 /></button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

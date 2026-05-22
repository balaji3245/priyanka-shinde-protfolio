import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCat, setCurrentCat] = useState(null);
  const [formData, setFormData] = useState({ icon: '☕', title: '', skillsList: '', order: 0 });

  const fetch_ = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'skills'));
      const list = []; snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      list.sort((a, b) => (a.order || 0) - (b.order || 0));
      setSkills(list);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const onChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const openAdd = () => { setCurrentCat(null); setFormData({ icon: '☕', title: '', skillsList: '', order: skills.length }); setIsEditing(true); };
  const openEdit = cat => { setCurrentCat(cat); setFormData({ icon: cat.icon || '☕', title: cat.title || '', skillsList: Array.isArray(cat.skills) ? cat.skills.join(', ') : '', order: cat.order || 0 }); setIsEditing(true); };
  const handleDelete = async id => {
    if (!window.confirm('Delete this skill category?')) return;
    await deleteDoc(doc(db, 'skills', id)); fetch_();
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const data = { icon: formData.icon, title: formData.title, skills: formData.skillsList.split(',').map(s => s.trim()).filter(Boolean), order: Number(formData.order) };
    if (currentCat) await updateDoc(doc(db, 'skills', currentCat.id), data);
    else await addDoc(collection(db, 'skills'), data);
    setIsEditing(false); fetch_();
  };

  const totalSkills = skills.reduce((acc, cat) => acc + (Array.isArray(cat.skills) ? cat.skills.length : 0), 0);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Skills</h1>
          <p className="admin-page-subtitle">Your tech stack and competencies</p>
        </div>
        {!isEditing && <button className="admin-btn-primary" onClick={openAdd}><FiPlus /> Add Category</button>}
      </div>

      {!isEditing && (
        <div className="admin-stats-row">
          <div className="admin-stat-card"><div className="admin-stat-card__icon">🗂️</div><div className="admin-stat-card__num">{skills.length}</div><div className="admin-stat-card__label">Categories</div></div>
          <div className="admin-stat-card"><div className="admin-stat-card__icon">⚡</div><div className="admin-stat-card__num">{totalSkills}</div><div className="admin-stat-card__label">Total Skills</div></div>
        </div>
      )}

      {isEditing ? (
        <div className="admin-form-card">
          <div className="admin-form-card__header">
            <h2 className="admin-form-card__title">{currentCat ? '✏️ Edit Category' : '➕ New Category'}</h2>
            <button onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 20 }}><FiX /></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-card__body">
              <div className="admin-form-grid">
                <div className="admin-form-field">
                  <label className="admin-form-label">Category Title *</label>
                  <input name="title" required value={formData.title} onChange={onChange} className="admin-form-input" placeholder="Programming Languages" />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Emoji Icon</label>
                  <input name="icon" value={formData.icon} onChange={onChange} className="admin-form-input" />
                </div>
                <div className="admin-form-field span-2">
                  <label className="admin-form-label">Skills (comma separated) *</label>
                  <input name="skillsList" required value={formData.skillsList} onChange={onChange} className="admin-form-input" placeholder="Java, Python, JavaScript, C++" />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Sort Order (0 = first)</label>
                  <input name="order" type="number" value={formData.order} onChange={onChange} className="admin-form-input" />
                </div>
              </div>
            </div>
            <div className="admin-form-footer">
              <button type="button" className="admin-btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              <button type="submit" className="admin-btn-primary"><FiSave /> Save Category</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-table-card">
          <div className="admin-table-card__header">
            <div><span className="admin-table-card__title">All Categories</span><span className="admin-table-card__count">({skills.length})</span></div>
          </div>
          {loading ? (
            <div className="admin-loading"><div className="admin-spinner" /><span>Loading...</span></div>
          ) : skills.length === 0 ? (
            <div className="admin-empty"><div className="admin-empty__icon">⚡</div><div className="admin-empty__title">No skills added</div><div className="admin-empty__desc">Add your tech stack categories.</div></div>
          ) : (
            skills.map(cat => (
              <div key={cat.id} className="admin-row">
                <div style={{ width: 44, height: 44, background: 'rgba(99,102,241,0.08)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {cat.icon}
                </div>
                <div className="admin-row__info">
                  <div className="admin-row__title">{cat.title}</div>
                  <div className="admin-pill-list" style={{ marginTop: 6 }}>
                    {Array.isArray(cat.skills) && cat.skills.map(s => <span key={s} className="admin-pill">{s}</span>)}
                  </div>
                </div>
                <div className="admin-row__actions">
                  <button className="admin-action-btn edit" onClick={() => openEdit(cat)}><FiEdit2 /></button>
                  <button className="admin-action-btn delete" onClick={() => handleDelete(cat.id)}><FiTrash2 /></button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

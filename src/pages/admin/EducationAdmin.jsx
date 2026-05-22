import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

export default function EducationAdmin() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdu, setCurrentEdu] = useState(null);
  const [formData, setFormData] = useState({ icon: '🎓', score: '', degree: '', school: '', year: '', order: 0 });

  const fetch_ = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'education'));
      const list = []; snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      list.sort((a, b) => (a.order || 0) - (b.order || 0));
      setEducation(list);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const onChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const openAdd = () => { setCurrentEdu(null); setFormData({ icon: '🎓', score: '', degree: '', school: '', year: '', order: education.length }); setIsEditing(true); };
  const openEdit = e => { setCurrentEdu(e); setFormData({ icon: e.icon || '🎓', score: e.score || '', degree: e.degree || '', school: e.school || '', year: e.year || '', order: e.order || 0 }); setIsEditing(true); };
  const handleDelete = async id => {
    if (!window.confirm('Delete this education entry?')) return;
    await deleteDoc(doc(db, 'education', id)); fetch_();
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const data = { ...formData, order: Number(formData.order) };
    if (currentEdu) await updateDoc(doc(db, 'education', currentEdu.id), data);
    else await addDoc(collection(db, 'education'), data);
    setIsEditing(false); fetch_();
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Education</h1>
          <p className="admin-page-subtitle">Your academic background and degrees</p>
        </div>
        {!isEditing && <button className="admin-btn-primary" onClick={openAdd}><FiPlus /> Add Degree</button>}
      </div>

      {!isEditing && (
        <div className="admin-stats-row">
          <div className="admin-stat-card"><div className="admin-stat-card__icon">🎓</div><div className="admin-stat-card__num">{education.length}</div><div className="admin-stat-card__label">Qualifications</div></div>
        </div>
      )}

      {isEditing ? (
        <div className="admin-form-card">
          <div className="admin-form-card__header">
            <h2 className="admin-form-card__title">{currentEdu ? '✏️ Edit Degree' : '➕ New Degree'}</h2>
            <button onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 20 }}><FiX /></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-card__body">
              <div className="admin-form-grid">
                <div className="admin-form-field span-2">
                  <label className="admin-form-label">Degree / Certificate *</label>
                  <input name="degree" required value={formData.degree} onChange={onChange} className="admin-form-input" placeholder="B.Tech in Computer Engineering" />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">School / Institution *</label>
                  <input name="school" required value={formData.school} onChange={onChange} className="admin-form-input" placeholder="DBATU Lonere" />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Score / CGPA *</label>
                  <input name="score" required value={formData.score} onChange={onChange} className="admin-form-input" placeholder="CGPA 7.75" />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Year / Period *</label>
                  <input name="year" required value={formData.year} onChange={onChange} className="admin-form-input" placeholder="2019 – 2023" />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Emoji Icon</label>
                  <input name="icon" value={formData.icon} onChange={onChange} className="admin-form-input" />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Sort Order (0 = first)</label>
                  <input name="order" type="number" value={formData.order} onChange={onChange} className="admin-form-input" />
                </div>
              </div>
            </div>
            <div className="admin-form-footer">
              <button type="button" className="admin-btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              <button type="submit" className="admin-btn-primary"><FiSave /> Save Degree</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-table-card">
          <div className="admin-table-card__header">
            <div><span className="admin-table-card__title">All Qualifications</span><span className="admin-table-card__count">({education.length})</span></div>
          </div>
          {loading ? (
            <div className="admin-loading"><div className="admin-spinner" /><span>Loading...</span></div>
          ) : education.length === 0 ? (
            <div className="admin-empty"><div className="admin-empty__icon">🎓</div><div className="admin-empty__title">No education added</div><div className="admin-empty__desc">Add your academic background.</div></div>
          ) : (
            education.map(edu => (
              <div key={edu.id} className="admin-row">
                <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #ede9fe, #dbeafe)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {edu.icon}
                </div>
                <div className="admin-row__info">
                  <div className="admin-row__title">{edu.degree}</div>
                  <div className="admin-row__meta">{edu.school} &nbsp;·&nbsp; {edu.year}</div>
                  <span style={{ display: 'inline-block', marginTop: 4, fontSize: 11, fontWeight: 700, color: '#4f46e5', background: 'rgba(99,102,241,0.08)', padding: '2px 8px', borderRadius: 20 }}>
                    {edu.score}
                  </span>
                </div>
                <div className="admin-row__actions">
                  <button className="admin-action-btn edit" onClick={() => openEdit(edu)}><FiEdit2 /></button>
                  <button className="admin-action-btn delete" onClick={() => handleDelete(edu.id)}><FiTrash2 /></button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

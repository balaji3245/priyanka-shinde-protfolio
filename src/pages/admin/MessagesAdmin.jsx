import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiTrash2, FiMail, FiCheck, FiInbox } from 'react-icons/fi';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const list = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      setMessages(list);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this message?')) return;
    await deleteDoc(doc(db, 'messages', id));
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const markAsRead = async id => {
    await updateDoc(doc(db, 'messages', id), { read: true });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const formatDate = ts => {
    if (!ts) return 'Just now';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  };

  const getInitials = name => name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '?';

  const unread = messages.filter(m => !m.read).length;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Messages</h1>
          <p className="admin-page-subtitle">Contact form submissions from your portfolio</p>
        </div>
      </div>

      <div className="admin-stats-row">
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon">📬</div>
          <div className="admin-stat-card__num">{messages.length}</div>
          <div className="admin-stat-card__label">Total Messages</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon">🔔</div>
          <div className="admin-stat-card__num">{unread}</div>
          <div className="admin-stat-card__label">Unread</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon">✅</div>
          <div className="admin-stat-card__num">{messages.length - unread}</div>
          <div className="admin-stat-card__label">Read</div>
        </div>
      </div>

      {loading ? (
        <div className="admin-loading"><div className="admin-spinner" /><span>Loading messages...</span></div>
      ) : messages.length === 0 ? (
        <div className="admin-table-card">
          <div className="admin-empty">
            <div className="admin-empty__icon">📭</div>
            <div className="admin-empty__title">Inbox is empty</div>
            <div className="admin-empty__desc">When someone fills out your contact form, it will appear here.</div>
          </div>
        </div>
      ) : (
        <div>
          {messages.map(msg => (
            <div key={msg.id} className={`admin-msg-card ${!msg.read ? 'unread' : ''}`}>
              <div className="admin-msg-card__header">
                <div className="admin-msg-card__sender">
                  <div className="admin-msg-card__avatar">{getInitials(msg.name)}</div>
                  <div>
                    <div className="admin-msg-card__name">
                      {msg.name}
                      {!msg.read && <span className="admin-badge new" style={{ marginLeft: 8 }}>New</span>}
                    </div>
                    <div className="admin-msg-card__email">{msg.email}</div>
                  </div>
                </div>
                <div className="admin-msg-card__actions">
                  {!msg.read && (
                    <button className="admin-action-btn read" title="Mark as Read" onClick={() => markAsRead(msg.id)}><FiCheck /></button>
                  )}
                  <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`} className="admin-action-btn reply" title="Reply via Email"><FiMail /></a>
                  <button className="admin-action-btn delete" title="Delete" onClick={() => handleDelete(msg.id)}><FiTrash2 /></button>
                </div>
              </div>

              <div className="admin-msg-card__subject">{msg.subject}</div>
              <div className="admin-msg-card__body">{msg.message}</div>

              <div className="admin-msg-card__footer">
                <span className="admin-msg-card__time">🕐 {formatDate(msg.createdAt)}</span>
                <a
                  href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                  style={{ fontSize: 12, color: '#6366f1', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5, textDecoration: 'none' }}
                >
                  <FiMail size={12} /> Reply by Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

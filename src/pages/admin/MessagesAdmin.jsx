import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiTrash2, FiMail, FiCheck, FiInbox } from 'react-icons/fi';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      // Sort by latest first
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const msgList = [];
      querySnapshot.forEach((doc) => {
        msgList.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgList);
    } catch (err) {
      console.error("Error fetching messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'messages', id));
        setMessages(prev => prev.filter(m => m.id !== id));
      } catch (err) {
        console.error("Error deleting document: ", err);
      }
    }
  };

  const markAsRead = async (id) => {
    try {
      await updateDoc(doc(db, 'messages', id), { read: true });
      setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    } catch (err) {
      console.error("Error updating document: ", err);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    // Firestore timestamp to JS Date
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  if (loading && messages.length === 0) {
    return <div className="text-gray-500">Loading messages...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Inbox Messages</h1>
        <div className="bg-white px-4 py-2 rounded-md shadow-sm text-sm font-medium text-gray-700 border border-gray-200 flex items-center gap-2">
          <FiInbox className="text-indigo-500" />
          {messages.length} Total
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <FiMail className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-900">Your inbox is empty</p>
            <p className="text-sm mt-1">When someone fills out your contact form, it will appear here.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {messages.map((msg) => (
              <li key={msg.id} className={`p-6 transition-colors ${msg.read ? 'bg-white' : 'bg-indigo-50/30'}`}>
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  
                  {/* Message Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-base font-semibold ${msg.read ? 'text-gray-900' : 'text-indigo-900'}`}>
                        {msg.name}
                      </h3>
                      <span className="text-sm text-gray-500">&lt;{msg.email}&gt;</span>
                      {!msg.read && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                          New
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm font-medium text-gray-900 mb-2">Subject: {msg.subject}</div>
                    
                    <div className="bg-gray-50 rounded-md p-4 text-sm text-gray-700 whitespace-pre-wrap border border-gray-100">
                      {msg.message}
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-400 font-medium">
                      Received: {formatDate(msg.createdAt)}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-start gap-2 shrink-0">
                    {!msg.read && (
                      <button
                        onClick={() => markAsRead(msg.id)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors border border-transparent hover:border-green-100 hover:bg-green-50 rounded"
                        title="Mark as Read"
                      >
                        <FiCheck />
                      </button>
                    )}
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      className="p-2 text-gray-400 hover:text-indigo-600 transition-colors border border-transparent hover:border-indigo-100 hover:bg-indigo-50 rounded"
                      title="Reply via Email"
                    >
                      <FiMail />
                    </a>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors border border-transparent hover:border-red-100 hover:bg-red-50 rounded"
                      title="Delete Message"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { FiHome, FiBriefcase, FiAward, FiBook, FiCode, FiMenu, FiX, FiInbox, FiExternalLink } from 'react-icons/fi';
import './admin.css';

const NAV_ITEMS = [
  { name: 'Projects',   path: '/admin/projects',   icon: FiCode,      label: 'Manage projects' },
  { name: 'Experience', path: '/admin/experience', icon: FiBriefcase, label: 'Work history' },
  { name: 'Education',  path: '/admin/education',  icon: FiBook,      label: 'Academic records' },
  { name: 'Skills',     path: '/admin/skills',     icon: FiAward,     label: 'Tech stack' },
  { name: 'Messages',   path: '/admin/messages',   icon: FiInbox,     label: 'Contact inbox' },
];

function SidebarContent({ location, onClose }) {
  return (
    <div className="admin-sidebar">
      {/* Brand */}
      <div className="admin-sidebar__brand">
        <div className="admin-sidebar__logo">PS</div>
        <div>
          <div className="admin-sidebar__title">Priyanka Shinde</div>
          <div className="admin-sidebar__subtitle">Portfolio Admin</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 20 }}
          >
            <FiX />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="admin-sidebar__nav">
        <div className="admin-sidebar__section-label">Content</div>
        {NAV_ITEMS.map(item => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`admin-sidebar__link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <item.icon className="admin-sidebar__link-icon" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="admin-sidebar__footer">
        <a href="/" target="_blank" rel="noreferrer" className="admin-sidebar__view-site">
          <FiExternalLink style={{ flexShrink: 0 }} />
          View Live Portfolio
        </a>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Derive page title from current path
  const currentNav = NAV_ITEMS.find(n => location.pathname.startsWith(n.path));

  return (
    <div className="admin-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}
        >
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setSidebarOpen(false)}
          />
          <div style={{ position: 'relative', zIndex: 51 }}>
            <SidebarContent location={location} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div style={{ display: 'none' }} className="admin-desktop-sidebar">
        <SidebarContent location={location} />
      </div>
      <div className="hidden md:block">
        <SidebarContent location={location} />
      </div>

      {/* Main */}
      <div className="admin-main">
        {/* Topbar */}
        <div className="admin-topbar">
          <button
            className="md:hidden"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: 22, display: 'flex', alignItems: 'center' }}
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>
          <div>
            <div className="admin-topbar__title">
              {currentNav ? currentNav.name : 'Dashboard'}
            </div>
          </div>
          <div className="admin-topbar__right">
            <a href="/" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6366f1', fontWeight: 600, textDecoration: 'none' }}
              className="hidden sm:flex"
            >
              <FiExternalLink /> Live Site
            </a>
            <div className="admin-topbar__avatar">PS</div>
          </div>
        </div>

        {/* Content */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

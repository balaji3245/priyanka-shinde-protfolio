import { useState } from 'react';
import { auth } from '../../firebase';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { FiHome, FiBriefcase, FiAward, FiBook, FiCode, FiLogOut, FiMenu, FiX, FiInbox } from 'react-icons/fi';

const NAV_ITEMS = [
  { name: 'Projects', path: '/admin/projects', icon: FiCode },
  { name: 'Experience', path: '/admin/experience', icon: FiBriefcase },
  { name: 'Education', path: '/admin/education', icon: FiBook },
  { name: 'Skills', path: '/admin/skills', icon: FiAward },
  { name: 'Messages', path: '/admin/messages', icon: FiInbox },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-gray-900 text-white w-64 flex-shrink-0">
      <div className="flex items-center justify-between h-16 px-4 bg-gray-900 border-b border-gray-800">
        <Link to="/admin" className="text-xl font-bold flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-sm">PS</div>
          Admin Panel
        </Link>
        <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
          <FiX size={24} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-4">
            <FiHome className="mr-3 flex-shrink-0 h-5 w-5" />
            View Live Site
          </a>
          
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 mt-4">
            Content Management
          </div>
          
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-300'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 font-sans" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <SidebarContent />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 flex border-b border-gray-200 bg-white">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <FiMenu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex items-center justify-center pr-12">
            <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Admin Panel</h1>
          </div>
        </div>
        
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Outlet renders the matched child route component */}
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Home />} />
          
          {/* Login Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* The index route for /admin will default to Projects for now */}
            <Route index element={<ProjectsAdmin />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="experience" element={<div className="p-4">Experience Admin (Coming Soon)</div>} />
            <Route path="education" element={<div className="p-4">Education Admin (Coming Soon)</div>} />
            <Route path="skills" element={<div className="p-4">Skills Admin (Coming Soon)</div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

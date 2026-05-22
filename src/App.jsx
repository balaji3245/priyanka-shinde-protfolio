import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import ProtectedRoute from './components/ProtectedRoute';

import ExperienceAdmin from './pages/admin/ExperienceAdmin';
import EducationAdmin from './pages/admin/EducationAdmin';
import SkillsAdmin from './pages/admin/SkillsAdmin';
import MessagesAdmin from './pages/admin/MessagesAdmin';

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
            <Route path="experience" element={<ExperienceAdmin />} />
            <Route path="education" element={<EducationAdmin />} />
            <Route path="skills" element={<SkillsAdmin />} />
            <Route path="messages" element={<MessagesAdmin />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import translations from '../translations';
import EmployeeManagement from '../components/EmployeeManagement';
import AboutManagement from '../components/AboutManagement';
import ProjectManagement from '../components/ProjectManagement';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('employees');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!localStorage.getItem('token')) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>🎛️ {t.adminPanel}</h2>
        <nav className="admin-nav">
          <button
            className={`nav-btn ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            👥 {t.employees}
          </button>
          <button
            className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            ℹ️ {t.about}
          </button>
          <button
            className={`nav-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            📦 {t.portfolio}
          </button>
          <button onClick={handleLogout} className="btn-logout-admin">
            🚪 {t.logout}
          </button>
        </nav>
      </div>

      <div className="admin-content">
        {activeTab === 'employees' && <EmployeeManagement />}
        {activeTab === 'about' && <AboutManagement />}
        {activeTab === 'portfolio' && <ProjectManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;

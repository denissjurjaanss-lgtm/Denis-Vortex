import React from 'react';
import '../styles/Sidebar.css';

function Sidebar({ user, activeSection, onSectionChange, isChief, onLogout }) {
  const menuItems = [
    { id: 'members', label: 'Biedri', icon: '👥' },
    { id: 'search', label: 'Meklēt', icon: '🔍' },
    ...(isChief ? [
      { id: 'chief', label: 'Chief Panelis', icon: '👑' },
      { id: 'ranks', label: 'Rangi', icon: '⭐' }
    ] : [])
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <h3>VORTEX</h3>
          <p>SWAT</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          Izrakstīties
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

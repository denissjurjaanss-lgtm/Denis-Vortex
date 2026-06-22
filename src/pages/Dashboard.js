import React, { useState } from 'react';
import '../styles/Dashboard.css';
import Sidebar from '../components/Sidebar';
import ChiefPanel from '../components/ChiefPanel';
import MembersList from '../components/MembersList';
import RankManagement from '../components/RankManagement';
import SearchMembers from '../components/SearchMembers';

function Dashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState('members');
  const [members, setMembers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@swat.com',
      staticId: 'SWAT001',
      rank: 'Chief',
      status: 'apstiprināts',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@swat.com',
      staticId: 'SWAT002',
      rank: 'Deputy Chief',
      status: 'На рассмотрении',
      joinDate: '2024-06-20'
    }
  ]);

  const isChief = user.rank === 'Chief';

  const handleApproveRequest = (memberId) => {
    setMembers(prev =>
      prev.map(m =>
        m.id === memberId ? { ...m, status: 'apstiprināts' } : m
      )
    );
  };

  const handleRejectRequest = (memberId) => {
    setMembers(prev =>
      prev.filter(m => m.id !== memberId)
    );
  };

  const handleUpdateRank = (memberId, newRank) => {
    setMembers(prev =>
      prev.map(m =>
        m.id === memberId ? { ...m, rank: newRank } : m
      )
    );
  };

  const handleAddWarning = (memberId) => {
    alert(`Brīdinājums pievienots lietotājam ID: ${memberId}`);
  };

  return (
    <div className="dashboard">
      <Sidebar
        user={user}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isChief={isChief}
        onLogout={onLogout}
      />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>
            {activeSection === 'members' && 'Biedri'}
            {activeSection === 'chief' && 'Chief Panelis'}
            {activeSection === 'ranks' && 'Rangu Pārvaldība'}
            {activeSection === 'search' && 'Meklēt Biedru'}
          </h2>
          <div className="user-info">
            <span className="user-rank">{user.rank}</span>
            <span className="user-name">{user.firstName} {user.lastName}</span>
          </div>
        </div>

        <div className="dashboard-body">
          {activeSection === 'members' && (
            <MembersList members={members} />
          )}
          
          {activeSection === 'chief' && isChief && (
            <ChiefPanel
              members={members}
              onApprove={handleApproveRequest}
              onReject={handleRejectRequest}
              onAddWarning={handleAddWarning}
            />
          )}

          {activeSection === 'ranks' && isChief && (
            <RankManagement
              members={members}
              onUpdateRank={handleUpdateRank}
            />
          )}

          {activeSection === 'search' && (
            <SearchMembers members={members} />
          )}

          {activeSection === 'chief' && !isChief && (
            <div className="access-denied">
              <p>⚠️ Piekļuve liegta. Tikai Chief var piekļūt šai sektcijai.</p>
            </div>
          )}

          {activeSection === 'ranks' && !isChief && (
            <div className="access-denied">
              <p>⚠️ Piekļuve liegta. Tikai Chief var pārvaldīt rangus.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

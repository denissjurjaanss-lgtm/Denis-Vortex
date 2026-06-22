import React, { useState } from 'react';
import '../styles/RankManagement.css';

function RankManagement({ members, onUpdateRank }) {
  const ranks = [
    'Chief',
    'Deputy Chief',
    'Commander SWAT',
    'Instructor SWAT',
    'SWAT Officer',
    'SWAT Recruit'
  ];

  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedRank, setSelectedRank] = useState('');

  const handleUpdateClick = () => {
    if (selectedMember && selectedRank) {
      onUpdateRank(selectedMember, selectedRank);
      setSelectedMember(null);
      setSelectedRank('');
    }
  };

  return (
    <div className="rank-management">
      <div className="rank-section">
        <h3>Rangu Pārvaldība</h3>
        
        <div className="rank-update-form">
          <div className="form-group">
            <label>Izvēlēties Biedru</label>
            <select
              value={selectedMember || ''}
              onChange={(e) => setSelectedMember(Number(e.target.value) || null)}
            >
              <option value="">-- Izvēlieties biedru --</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.firstName} {member.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Jaunais Rangs</label>
            <select
              value={selectedRank}
              onChange={(e) => setSelectedRank(e.target.value)}
            >
              <option value="">-- Izvēlieties rangu --</option>
              {ranks.map((rank) => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="btn-update-rank"
            onClick={handleUpdateClick}
            disabled={!selectedMember || !selectedRank}
          >
            Atjaunināt Rangu
          </button>
        </div>

        <div className="ranks-list">
          <h4>Pašreizējie Rangi</h4>
          {members.map((member) => (
            <div key={member.id} className="rank-item">
              <span className="member-info">
                {member.firstName} {member.lastName}
              </span>
              <span className="current-rank">{member.rank}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rank-section">
        <h3>Rangu Apraksts</h3>
        <div className="ranks-info">
          <div className="rank-info-card">
            <h4>Chief (Virsnieks)</h4>
            <p>Augstākā pozīcija. Pilna kontrole pār SWAT komandu.</p>
          </div>
          <div className="rank-info-card">
            <h4>Deputy Chief (Virvecinieks)</h4>
            <p>Palīdz Chief pārvaldīt komandu. Otrā augstākā pozīcija.</p>
          </div>
          <div className="rank-info-card">
            <h4>Commander SWAT</h4>
            <p>Komandē speciālajiem operācijām.</p>
          </div>
          <div className="rank-info-card">
            <h4>Instructor SWAT</h4>
            <p>Apmāca jaunos SWAT locekļus.</p>
          </div>
          <div className="rank-info-card">
            <h4>SWAT Officer</h4>
            <p>Pilna tiesība piedalīties operācijās.</p>
          </div>
          <div className="rank-info-card">
            <h4>SWAT Recruit</h4>
            <p>Jauns loceklis. Apmācības stadijā.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankManagement;

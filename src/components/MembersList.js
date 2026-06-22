import React from 'react';
import '../styles/MembersList.css';

function MembersList({ members }) {
  const getRankColor = (rank) => {
    const colors = {
      'Chief': '#ffd700',
      'Deputy Chief': '#c0c0c0',
      'Commander SWAT': '#0066ff',
      'Instructor SWAT': '#00cc66',
      'SWAT Officer': '#b0b0b0',
      'SWAT Recruit': '#808080',
      'На рассмотрении': '#ffaa00'
    };
    return colors[rank] || '#b0b0b0';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'apstiprināts': { color: '#00cc66', text: '✓ Apstiprināts' },
      'На рассмотрении': { color: '#ffaa00', text: '⏳ Uz apstiprināšanu' }
    };
    return badges[status] || { color: '#b0b0b0', text: status };
  };

  return (
    <div className="members-list">
      <div className="members-table">
        <div className="table-header">
          <div className="col col-name">Vārds un Uzvārds</div>
          <div className="col col-email">Email</div>
          <div className="col col-staticid">Statik ID</div>
          <div className="col col-rank">Rangs</div>
          <div className="col col-status">Statuss</div>
          <div className="col col-date">Pievienošanās Datums</div>
        </div>

        {members.length > 0 ? (
          members.map((member, index) => {
            const statusBadge = getStatusBadge(member.status);
            return (
              <div key={index} className="table-row">
                <div className="col col-name">{member.firstName} {member.lastName}</div>
                <div className="col col-email">{member.email}</div>
                <div className="col col-staticid">{member.staticId}</div>
                <div 
                  className="col col-rank" 
                  style={{ color: getRankColor(member.rank) }}
                >
                  {member.rank}
                </div>
                <div className="col col-status">
                  <span 
                    className="status-badge"
                    style={{ borderColor: statusBadge.color, color: statusBadge.color }}
                  >
                    {statusBadge.text}
                  </span>
                </div>
                <div className="col col-date">{member.joinDate}</div>
              </div>
            );
          })
        ) : (
          <div className="table-empty">Nav biedru datus</div>
        )}
      </div>
    </div>
  );
}

export default MembersList;

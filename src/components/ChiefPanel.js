import React from 'react';
import '../styles/ChiefPanel.css';

function ChiefPanel({ members, onApprove, onReject, onAddWarning }) {
  const pendingMembers = members.filter(m => m.status === 'На рассмотрении');

  return (
    <div className="chief-panel">
      <div className="panel-section">
        <h3>Gaidošie Pieteikumi</h3>
        <div className="pending-list">
          {pendingMembers.length > 0 ? (
            pendingMembers.map((member) => (
              <div key={member.id} className="pending-card">
                <div className="pending-info">
                  <h4>{member.firstName} {member.lastName}</h4>
                  <p className="static-id">ID: {member.staticId}</p>
                  <p className="email">{member.email}</p>
                </div>
                <div className="pending-actions">
                  <button
                    className="btn-approve"
                    onClick={() => onApprove(member.id)}
                  >
                    ✓ Apstiprināt
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => onReject(member.id)}
                  >
                    ✗ Noraidīt
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-message">Nav gaidošu pieteikumu</p>
          )}
        </div>
      </div>

      <div className="panel-section">
        <h3>Brīdinājumi</h3>
        <div className="warnings-list">
          {members.length > 0 ? (
            members.map((member) => (
              <div key={member.id} className="warning-card">
                <span className="member-name">{member.firstName} {member.lastName}</span>
                <button
                  className="btn-warning"
                  onClick={() => onAddWarning(member.id)}
                >
                  + Pievienot Brīdinājumu
                </button>
              </div>
            ))
          ) : (
            <p className="empty-message">Nav biedru datus</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChiefPanel;

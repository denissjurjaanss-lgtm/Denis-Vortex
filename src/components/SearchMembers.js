import React, { useState, useMemo } from 'react';
import '../styles/SearchMembers.css';

function SearchMembers({ members }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('staticId');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return members.filter((member) => {
      const query = searchQuery.toLowerCase();

      switch (searchType) {
        case 'staticId':
          return member.staticId.toLowerCase().includes(query);
        case 'name':
          return (
            member.firstName.toLowerCase().includes(query) ||
            member.lastName.toLowerCase().includes(query)
          );
        case 'email':
          return member.email.toLowerCase().includes(query);
        default:
          return false;
      }
    });
  }, [searchQuery, searchType, members]);

  return (
    <div className="search-members">
      <div className="search-box">
        <div className="search-controls">
          <div className="control-group">
            <label>Meklēt pēc:</label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="staticId">Statik ID</option>
              <option value="name">Vārds un Uzvārds</option>
              <option value="email">Email</option>
            </select>
          </div>

          <div className="control-group">
            <label>Meklēšanas Vaicājums:</label>
            <input
              type="text"
              placeholder="Ievadiet meklēšanas vaicājumu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="search-results">
          {searchQuery && (
            <h3>Atrasti {searchResults.length} rezultāti</h3>
          )}

          {searchResults.length > 0 ? (
            <div className="results-list">
              {searchResults.map((member) => (
                <div key={member.id} className="result-card">
                  <div className="result-info">
                    <h4>{member.firstName} {member.lastName}</h4>
                    <p className="static-id">ID: {member.staticId}</p>
                    <p className="email">📧 {member.email}</p>
                    <div className="member-details">
                      <span className="rank" style={{ color: getRankColor(member.rank) }}>
                        {member.rank}
                      </span>
                      <span className="join-date">
                        📅 {member.joinDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="no-results">
              <p>❌ Rezultāti nav atrasti</p>
            </div>
          ) : (
            <div className="empty-state">
              <p>🔍 Sāciet meklēšanu...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const getRankColor = (rank) => {
  const colors = {
    'Chief': '#ffd700',
    'Deputy Chief': '#c0c0c0',
    'Commander SWAT': '#0066ff',
    'Instructor SWAT': '#00cc66',
    'SWAT Officer': '#b0b0b0',
    'SWAT Recruit': '#808080'
  };
  return colors[rank] || '#b0b0b0';
};

export default SearchMembers;

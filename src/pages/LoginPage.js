import React, { useState } from 'react';
import '../styles/LoginPage.css';

function LoginPage({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    staticId: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (isRegistering) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Vārds ir obligāts';
      if (!formData.lastName.trim()) newErrors.lastName = 'Uzvārds ir obligāts';
      if (!formData.email.includes('@')) newErrors.email = 'Derīgs email ir obligāts';
      if (!formData.staticId.trim()) newErrors.staticId = 'Statik ID ir obligāts';
      if (formData.password.length < 6) newErrors.password = 'Parole ir vismaz 6 raksturi';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Paroles nesakrīt';
      }
    } else {
      if (!formData.email.includes('@')) newErrors.email = 'Derīgs email ir obligāts';
      if (!formData.password) newErrors.password = 'Parole ir obligāta';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userData = {
        firstName: formData.firstName || 'Guest',
        lastName: formData.lastName || 'User',
        email: formData.email,
        staticId: formData.staticId || 'N/A',
        rank: isRegistering ? 'На рассмотрении' : 'Chief',
        joinDate: new Date().toISOString()
      };

      onLogin(userData);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-section">
          <h1>VORTEX</h1>
          <p>SWAT Manager</p>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegistering ? (
            <>
              <div className="form-group">
                <label>Vārds *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Ievadiet vārdu"
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label>Uzvārds *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Ievadiet uzvārdu"
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>

              <div className="form-group">
                <label>Statik ID *</label>
                <input
                  type="text"
                  name="staticId"
                  value={formData.staticId}
                  onChange={handleChange}
                  placeholder="Ievadiet Statik ID"
                  className={errors.staticId ? 'error' : ''}
                />
                {errors.staticId && <span className="error-message">{errors.staticId}</span>}
              </div>
            </>
          ) : null}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ievadiet email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Parole</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ievadiet paroli"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {isRegistering && (
            <div className="form-group">
              <label>Apstipriniet paroli</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Apstipriniet paroli"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isRegistering ? 'Reģistrēties' : 'Pieslēgties'}
          </button>
        </form>

        <div className="toggle-auth">
          <p>
            {isRegistering ? 'Jau ir konts?' : 'Nav konta?'}
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="toggle-btn"
            >
              {isRegistering ? 'Pieslēgties' : 'Reģistrēties'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

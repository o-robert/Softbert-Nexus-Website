import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const PW_KEY = 'sn_admin_pw';

function getStoredPassword() {
  return localStorage.getItem(PW_KEY) || 'softbert2024';
}

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === getStoredPassword()) {
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-card__header">
          <div className="admin-login-card__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1>Admin Panel</h1>
          <p>Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-card__form">
          <div className="form-group">
            <label htmlFor="admin-pw">Password</label>
            <input
              id="admin-pw"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              autoFocus
            />
          </div>
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit" className="btn btn--primary btn--full">Sign In</button>
        </form>

        <div className="admin-login-card__footer">
          <Link to="/" className="btn btn--outline">← Back to site</Link>
        </div>
      </div>
    </div>
  );
}

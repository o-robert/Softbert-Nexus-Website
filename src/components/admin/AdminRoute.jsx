import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

const SESSION_KEY = 'sn_admin_session';

export default function AdminRoute() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');

  const login = () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setAuthed(true);
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  return authed ? <AdminPanel onLogout={logout} /> : <AdminLogin onLogin={login} />;
}

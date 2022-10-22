import React from 'react';
import css from '../../pages/Home.module.css';
import auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    auth.logout();
  };
  return (
    <div>
      {auth.loggedIn() ? (
        <>
        <div className={css.logoutHeader}>
          <button className={css.logoutButton} onClick={logout}>
            Logout
          </button>
        </div>
        </>
      ) : (
        <>
        </>
      )}
    </div>
  );
};

export default Header;

'use client';

import { AuthState, authState, useRecoilState } from '@store/index';
import { MAil_ADMIN } from 'app/constants';
import { useEffect, useRef } from 'react';
import NavbarAdmin from './navbarAdmin';
import NavbarCustomer from './navbarCustomer';

const Navigation = () => {
  const isMounted = useRef(false);
  const [auth, setAuth] = useRecoilState<AuthState>(authState);
  useEffect(() => {
    if (!isMounted.current) {
      const authStorage = localStorage.getItem('auth');
      if (authStorage) {
        setAuth(JSON.parse(authStorage));
      } else {
        setAuth({ email: '', token: '' });
      }
      return () => {
        isMounted.current = true;
      };
    }
  }, [setAuth]);

  return auth?.email === MAil_ADMIN ? <NavbarAdmin token={auth?.token} /> : <NavbarCustomer token={auth?.token} />;
};

export default Navigation;

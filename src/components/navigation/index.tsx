'use client';

import { AuthState, authState, useRecoilState } from '@store/index';
import { MAil_ADMIN } from 'app/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import NavbarAdmin from './navbarAdmin';
import NavbarCustomer from './navbarCustomer';

const Navigation = () => {
  const isMounted = useRef(false);
  const [auth, setAuth] = useRecoilState<AuthState>(authState);
  const router = useRouter();
  useEffect(() => {
    if (!isMounted.current) {
      const authStorage = localStorage.getItem('auth');
      if (authStorage) {
        const authParseJson = JSON.parse(authStorage);
        setAuth(authParseJson);
        // if (authParseJson.email === MAil_ADMIN) {
        //   router.push(`/summary`);
        //   return;
        // }
        // router.push(`/`);
      } else {
        setAuth({ email: '', token: '' });
        return;
      }
      return () => {
        isMounted.current = true;
      };
    }
  }, [router, setAuth]);

  return auth?.email === MAil_ADMIN ? <NavbarAdmin token={auth?.token} /> : <NavbarCustomer token={auth?.token} />;
};

export default Navigation;

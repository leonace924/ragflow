import authorizationUtil from '@/utils/authorization-util';
import { getSearchValue } from '@/utils/common-util';
import { useEffect } from 'react';

/**
 * Hook to persist auth token from URL params to localStorage.
 * This ensures the auth token survives SPA routing in cross-domain iframes.
 * Should be called early in shared/embedded page components.
 */
export const useSharedAuth = () => {
  useEffect(() => {
    const auth = getSearchValue('auth');
    if (auth && auth.trim()) {
      const newAuthValue = 'Bearer ' + auth;
      const existingAuth = authorizationUtil.getAuthorization();
      // Only update if different to avoid unnecessary localStorage writes
      if (existingAuth !== newAuthValue) {
        authorizationUtil.setAuthorization(newAuthValue);
      }
    }
  }, []);
};

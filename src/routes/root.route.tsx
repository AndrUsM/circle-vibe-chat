import React from 'react';

import { Route, BrowserRouter, Routes, Navigate, Outlet } from 'react-router-dom';

import { SocketProvider } from '@core/context/socket/socket.provider';
import { GLOBAL_PAGES_ENUM, PublicPagesEnum } from '@core/navigation';

import { AuthInterceptor } from './auth-interceptor';
import { PrivateRouter } from './private-routes';
import { PublicRouter } from './public-routes';

export const RootRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthInterceptor>
        <Routes>
          <Route path='auth' children={PublicRouter} />

          <Route
            path={`/${GLOBAL_PAGES_ENUM.APP}`}
            element={
              <SocketProvider>
                <Outlet />
              </SocketProvider>
            }
          >
            {PrivateRouter}
          </Route>

          {/* !DEFAULT ROUTES */}
          <Route
            path=''
            element={
              <Navigate to={`/${GLOBAL_PAGES_ENUM.AUTH}/${PublicPagesEnum.SIGN_IN}`} replace />
            }
          />
        </Routes>
      </AuthInterceptor>
    </BrowserRouter>
  );
};

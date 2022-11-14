import { FC, useContext, PropsWithChildren } from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from '../../context'

interface Props extends PropsWithChildren<{}> {

}

export const ProtectedRoute: FC<Props> =  ({ children }) => {

  const { user } = useContext(AuthContext)

  const location = useLocation()

  if (!user) {
      // user is not authenticated
      return <Navigate to={`/auth/login?p=${location.pathname}`} />;
  }

  return <>{children}</>;
}


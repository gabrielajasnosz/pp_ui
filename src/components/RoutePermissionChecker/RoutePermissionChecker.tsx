import React, { useEffect, ReactElement } from 'react'
import { useMetaMask } from '../../hooks/useMetaMask'
import { useNavigate } from 'react-router'

type RoutePermissionCheckerProps = {
  children: ReactElement
}

export const RoutePermissionChecker = ({ children }: RoutePermissionCheckerProps) => {
  const { isUserTrustedIssuer, isInfoLoaded } = useMetaMask();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isUserTrustedIssuer);
    if (isInfoLoaded && !isUserTrustedIssuer) {
      navigate("/");
    }
  }, [isUserTrustedIssuer, isInfoLoaded]);

  return <>{children}</>;
}
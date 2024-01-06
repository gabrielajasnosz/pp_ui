import React, { useEffect, ReactElement, useRef } from 'react'
import { useMetaMask } from '../../hooks/useMetaMask';
import { useNavigate } from 'react-router';

type Permission = 'TrustedIssuer' | 'Admin' | 'Owner';

type RoutePermissionCheckerProps = {
  permission?: Permission;
  children: ReactElement;
};

export const RoutePermissionChecker = ({
  permission = 'TrustedIssuer',
  children,
}: RoutePermissionCheckerProps) => {
  const {
    isUserTrustedIssuer,
    isUserAdmin,
    isUserContractOwner,
    isInfoLoaded,
  } = useMetaMask();
  const navigate = useNavigate();

  const hasPermission: Record<Permission, boolean> = {
    TrustedIssuer: isUserTrustedIssuer,
    Owner: isUserContractOwner,
    Admin: isUserAdmin,
  };

  useEffect(() => {
    if (isInfoLoaded && !hasPermission[permission]) {
      navigate('/');
    }
  }, [isUserTrustedIssuer, isInfoLoaded]);

  return <>{children}</>;
};

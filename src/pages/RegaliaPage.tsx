import React from 'react';
import { IdentityPresentation } from '../components/IdentityPresentation';

interface RegaliaPageProps {
  onNavigateBrand: (target: 'regalia' | 'leili') => void;
  isTransitioning: boolean;
}

export const RegaliaPage: React.FC<RegaliaPageProps> = ({
  onNavigateBrand,
  isTransitioning,
}) => {
  return (
    <IdentityPresentation
      brand="regalia"
      onNavigateBrand={onNavigateBrand}
      isTransitioning={isTransitioning}
    />
  );
};

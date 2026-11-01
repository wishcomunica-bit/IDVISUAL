import React from 'react';
import { IdentityPresentation } from '../components/IdentityPresentation';

interface LeiliBuenoPageProps {
  onNavigateBrand: (target: 'regalia' | 'leili') => void;
  isTransitioning: boolean;
}

export const LeiliBuenoPage: React.FC<LeiliBuenoPageProps> = ({
  onNavigateBrand,
  isTransitioning,
}) => {
  return (
    <IdentityPresentation
      brand="leili"
      onNavigateBrand={onNavigateBrand}
      isTransitioning={isTransitioning}
    />
  );
};

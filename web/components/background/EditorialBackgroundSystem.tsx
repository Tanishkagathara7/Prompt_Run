'use client';

import React from 'react';
import { InteractiveGridTiles } from '@/components/auth/InteractiveGridTiles';

/**
 * EditorialBackgroundSystem
 * Interactive cursor-reactive tile grid layer for the marketing page.
 */
export const EditorialBackgroundSystem: React.FC = () => {
  return (
    <InteractiveGridTiles tileSize={40} fixed className="z-0" />
  );
};

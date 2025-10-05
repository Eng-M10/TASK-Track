import useDrizzleStudio from '@/hooks/useDrizzleStudioPlugin';
import React from 'react';
import { DATABASE_NAME } from './_layout';
import Index from './index';

export default function App() {
  useDrizzleStudio(DATABASE_NAME);
  return (
    <Index />
  )
}
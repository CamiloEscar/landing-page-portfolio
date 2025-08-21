'use client';

import React, { Suspense, lazy } from 'react';
import Loading from '@/components/shared/loading';

const PortfolioPage = lazy(() => import('@/components/PortfolioPage'));
const MinimalNavbar = lazy(() => import('@/components/minimal/MinimalNavbar'));

export default function PortofolioPage() {
  return (
    <>
      <div className="min-h-screen text-foreground">
        <Suspense fallback={<Loading />}>
          <MinimalNavbar />
        </Suspense>
        <main>
          <Suspense fallback={<Loading />}>
            <PortfolioPage />
          </Suspense>
        </main>
      </div>
    </>
  );
}

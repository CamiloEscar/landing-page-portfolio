'use client';

import React, { Suspense, lazy } from 'react';
import Loading from '@/components/shared/loading';

const MinimalPortfolio = lazy(() => import('@/components/minimal/MinimalPortfolio'));
const MinimalNavbar = lazy(() => import('@/components/minimal/MinimalNavbar'));

export default function MinimalPage() {
  return (
    <>
      <div className="min-h-screen text-foreground">
        <Suspense fallback={<Loading />}>
          <MinimalNavbar />
        </Suspense>
        <main>
          <Suspense fallback={<Loading />}>
            <MinimalPortfolio />
          </Suspense>
        </main>
      </div>
    </>
  );
}

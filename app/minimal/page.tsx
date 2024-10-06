'use client';

import React, { Suspense, lazy } from 'react';
import Loading from '@/components/loading';

const MinimalPortfolio = lazy(() => import('@/components/MinimalPortfolio'));
const MinimalNavbar = lazy(() => import('@/components/MinimalNavbar'));

export default function MinimalPage() {
  return (
    <>
      <div className="min-h-screen text-foreground">
        <Suspense fallback={<Loading />}>
          <MinimalNavbar />
        </Suspense>
        <main className="pt-12">
          <Suspense fallback={<Loading />}>
            <MinimalPortfolio />
          </Suspense>
        </main>
      </div>
    </>
  );
}

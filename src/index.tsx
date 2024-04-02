import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/components/app';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About } from '@/pages/about';
import { Shop } from '@/pages/shop';

const root = document.querySelector('#root');

if(!root) {
  throw new Error('Root not found');
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: <Suspense fallback={<div>Loading...</div>}><About /></Suspense>
      },
      {
        path: '/shop',
        element: <Suspense fallback={<div>Loading...</div>}><Shop /></Suspense>
      }
    ]
  },
  {
    path: '*',
    element: <h1>404</h1>
  }
])

container.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
/**
 * App.tsx - Application entry point
 *
 * Wraps the entire app with:
 * - AuthProvider (global auth state)
 * - RouterProvider (client-side routing via routes.tsx)
 */

import '../styles/index.css';
import { RouterProvider } from 'react-router';
import { router } from './routes.tsx';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
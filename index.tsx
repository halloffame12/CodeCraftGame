
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
import { enUS } from '@clerk/localizations';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './components/SignIn';
import SignUpPage from './components/SignUp';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {(() => {
      const localization = {
        ...enUS,
        unstable__errors: {
          ...(enUS as any).unstable__errors,
          form_identifier_not_found: 'No account found. Please sign up to continue.',
        },
      };
      return (
        <ClerkProvider
          publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
          localization={localization}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/login" element={<Navigate to="/sign-in" replace />} />
              <Route path="/register" element={<Navigate to="/sign-up" replace />} />
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </ClerkProvider>
      );
    })()}
  </React.StrictMode>
);

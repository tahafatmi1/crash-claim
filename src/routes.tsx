import Home from './pages/Home';
import FormPage from './pages/FormPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
    visible: true
  },
  {
    name: 'Submit Claim',
    path: '/form',
    element: <FormPage />,
    visible: true
  },
  {
    name: 'Privacy Policy',
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
    visible: false
  },
  {
    name: 'Terms and Conditions',
    path: '/terms-and-conditions',
    element: <TermsAndConditions />,
    visible: false
  }
];

export default routes;

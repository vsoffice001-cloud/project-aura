/**
 * DashboardLayout — React Router wrapper
 *
 * Reads :tab/:subTab from URL params and passes them to DesignSystemDashboard.
 * Enables deep-linking, browser back/forward, and shareable URLs.
 */
import { useParams } from 'react-router';
import { DesignSystemDashboard } from './DesignSystemDashboard';

export function DashboardLayout() {
  const { tab, subTab } = useParams<{ tab: string; subTab: string }>();
  return <DesignSystemDashboard urlTab={tab} urlSubTab={subTab} />;
}

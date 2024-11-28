import { faSignOutAlt, faUser, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

export const navBarData = [
  {
    label: 'Dashboard',
    link: '/dashboard',
    icon: faTachometerAlt,
    type: 'link',
  },
  {
    label: 'Register Visitor',
    link: '/visitor-registration',
    icon: faUser,
    type: 'link',
  },
  {
    label: 'Sign Out',
    icon: faSignOutAlt,
    type: 'action',
  },
];

import { faSignOutAlt, faUser, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

export const navBarData = [
  {
    label: 'Dashboard',
    link: '/dashboard',
    icon: faTachometerAlt,
    type: 'link',
    access: ['admin', 'user'],
  },
  {
    label: 'Register Visitor',
    link: '/visitor-registration',
    icon: faUser,
    type: 'link',
    access: ['user'],
  },
  {
    label: 'Sign Out',
    icon: faSignOutAlt,
    type: 'action',
    access: ['admin', 'user'],
  },
];

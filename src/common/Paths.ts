/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Otp:{
    Base: '/otp',
    Generate: '/generate',
    Verify: '/verify'
  },
  Auth: {
    Base: '/auth',
    Login: '/login',
    Logout: '/logout',
  },
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;

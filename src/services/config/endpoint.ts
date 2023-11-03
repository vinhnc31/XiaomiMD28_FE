const endpoint = {
  csrf: '/api',
  auth: {
    register: '/api/auth/signup',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    profile: '/api/users/profile',
  },
  account: '/api/account',
  // categories: '/api',
  categories: 'http://10.10.66.87:3000/api',
};

export default endpoint;

const endpoint = {
  csrf: '/api',
  account: {
    default: '/api',
    register: '/api/register',
    login: '/api/login',
    logout: '/api/logout',
    profile: '/api/users/profile',
  },
  // categories: '/api',
  categories: 'http://192.168.0.197:3000/api',
  products: 'http://10.10.66.87:3000/api',
};

export default endpoint;

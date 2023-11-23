const endpoint = {
  csrf: '/api',
  account: {
    default: '/api',
    register: '/api/register',
    login: '/api/login',
    logout: '/api/logout',
    profile: '/api/users/profile',
  },

  categories: 'v',
  cart:{
    default:"/api/cart/1",
    getCart:"/api/cart/1",
    putCart:'/api/cart'
  }
};

export default endpoint;

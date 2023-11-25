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
  favorites:{
    default:"/api/favorite",
    getCart:"/api/favorite",
    putCart:'/api/favorite',
    deleteCart:'/api/favorite'
  },

  products: {
    
  },

};

export default endpoint;

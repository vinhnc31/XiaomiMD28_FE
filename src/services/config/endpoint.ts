const endpoint = {
  csrf: '/api',
  account: {
    default: '/api',
    register: '/api/register',
    login: '/api/login',
    logout: '/api/logout',
    profile: '/api/users/profile',
  },
  categories: {
    default: '/api/category',
    getCategory: '/api/category',
  },
 
  products: {
    default: '/api/products',
    getAllProduct: '/api/products',
    getProductByIdCategory: '/api/product/category',
    getMostProduct: '/api/product/most/Favorites',
    getProductByLimit: '/api/product',

  },
  cart:{
    default:"/api/cart/1",
    getCart:"/api/cart/1",
    putCart:'/api/cart',
    deleteCart:'/api/cart'
  },
  
  configuration: {
    default: '/api/config',
    getConfiguration: '/api/config',
  }
};

export default endpoint;

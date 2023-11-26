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
    getProduct: '/api/product',
    getProductByIdCategory: '/api/product/category'

  },
  
  favorites:{
    default:"/api/favorites",
    getCart:"/api/favorites",
    putCart:'/api/favorites',
    deleteCart:'/api/favorites'
  },

  cart:{
    default:"/api/cart/1",
    getCart:"/api/cart/1",
    putCart:'/api/cart',
    deleteCart:'/api/cart'
  }
};

export default endpoint;

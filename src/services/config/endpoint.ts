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
    getProductByIdCategory: '/api/product/category',
    getProductId: '/api/product',
  },
  
  favorites:{
    default:"/api/favorites",
    getCart:"/api/favorites",
    putCart:'/api/favorites',
    deleteCart:'/api/favorites'
  },

  cart:{
    default:"/api/cart",
    getCart:"/api/cart",
    putCart:'/api/cart',
    deleteCart:'/api/cart'
  },
  address:{
    default:"/api/address",
    postAddress:"/api/address",
    getAddress:"/api/address",
    putAddress:'/api/address',
    deleteAddress:'/api/address'
  },
  voucher:{
    default:"/api/promotion",
    getPromotion:"/api/promotion",
  }
};

export default endpoint;

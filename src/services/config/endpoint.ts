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
    getProductId: '/api/product',
    getCommentProductId: '/api/comment',
    getProductByLimit: '/api/product',
  },
  cart:{
    default:"/api/cart/1",
    getCart:"/api/cart/1",
    putCart:'/api/cart',
    deleteCart:'/api/cart'
  },
  
  favorites:{
    default:"/api/favorites",
    getfavorite:"/api/favorites",
    postfavorite:'/api/favorites',
    deletefavorite:'/api/favorites'
  },

  cart:{
    default:"/api/cart",
    getCart:"/api/cart",
    putCart:'/api/cart',
    deleteCart:'/api/cart',
    postCart:'/api/cart'
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
  },
  order:{
    default:"/api/order",
    getOrder:"/api/order",
    postOrder:"/api/order",
  },
  pay:{
    default:"/api/create_payment_url",
    postPay:"/api/create_payment_url",
  },
  configuration: {
    default: '/api/config',
    getConfiguration: '/api/config',
  },
  evaluate: {
    default: '/api/comment',
    getEvaluate: '/api/comment',
  },
  notification: {
    default: '/api/notification',
    getNotification: '/api/notification',
  }
};

export default endpoint;

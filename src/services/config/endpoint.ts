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
  },
  order:{
    default:"/api/order",
    getOrder:"/api/order",
    postOrder:"/api/order",
  },
  pay:{
    default:"/api/create_payment_url",
    postPay:"/api/create_payment_url",
  }
};

export default endpoint;

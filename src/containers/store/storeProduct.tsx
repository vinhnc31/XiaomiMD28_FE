import {create} from 'zustand';
import { ProductModel } from '@src/services/product/product.model';

interface ProductStoreState {
  dataProduct: ProductModel[];
}

interface ProductStoreActions {
  setProductData: (data: ProductModel[]) => void;
  getProductByLimit: (start: number, limit: number, get: () => ProductStoreState) => ProductModel[];
}


const useProductStore = create<ProductStoreState & ProductStoreActions>((set) => ({
  dataProduct: [],
  setProductData: (data) => set({ dataProduct: data }),
  
  getProductByLimit: (start, limit, get) => {
    // Assuming your dataProduct is an array of products
    const { dataProduct } = get(); // 'get()' is a function from zustand

    const newData = dataProduct.slice(start, start + limit);
    return newData;
  },

}));


export default useProductStore;

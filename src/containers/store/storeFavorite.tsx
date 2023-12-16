import {create} from 'zustand';
import { ProductModel } from '@src/services/product/product.model';

interface FavoriteStoreState {
  dataFavorite: ProductModel[];
}

const FavoriteStore = create<FavoriteStoreState>((set) => ({
  dataFavorite: [],
  setDataFavorite: (dataFavorite: ProductModel[]) => set({ dataFavorite: dataFavorite }),
}));


export default FavoriteStore;

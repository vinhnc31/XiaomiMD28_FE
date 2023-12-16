import {create} from 'zustand';
import { CategoryModel } from '@src/services/category/category.model';

interface CategoryStoreState {
  dataCategory: CategoryModel[];
}

const CategoryStore = create<CategoryStoreState>((set) => ({
  dataCategory: [],
  setDataCategory: (dataCategory: CategoryModel[]) => set({ dataCategory: dataCategory }),
}));





export default CategoryStore;

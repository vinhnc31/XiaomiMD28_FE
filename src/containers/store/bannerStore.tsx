// bannerStore.js

import {create} from 'zustand';

const useBannerStore = create((set) => ({
  bannerData: [],
  setBannerData: (data) => set({ bannerData: data }),
}));

export default useBannerStore;

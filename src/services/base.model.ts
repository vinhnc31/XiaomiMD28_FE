export interface BaseEntities {
  id?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  isStatus?: number;
}

export interface IPaging {
  pageIndex?: number;
  pageSize?: number;
}

export interface IFindPaging extends IPaging {
  searchText?: string;
}

export interface BasePagingRes<T> {
  data: T[];
  total: number;
}

import {BasePagingRes, IFindPaging} from '@src/services/base.model';
import endpoints from './config/endpoint';
import http from './config/http';

export class BaseService<T> {
  private url: string;

  constructor(_url: string = endpoints.csrf) {
    this.url = _url;
  }

  public async find<Req>(query: IFindPaging & Req) {
    const {data} = await http.get<BasePagingRes<T>>(`${this.url}/find`, {
      params: query,
    });
    return data;
  }

  public async findOne(id: number) {
    const {data} = await http.get<T>(`${this.url}/find/${id}`);
    return data;
  }

  public async findByIds(ids: number[]) {
    const {data} = await http.post<T[]>(`${this.url}/find-ids/`, {ids});
    return data;
  }

  public async create<Req>(obj: Req) {
    const {data} = await http.post<T>(this.url, obj);
    return data;
  }

  public async update<Req>(id: string, obj: Req, url?: string) {
    const {data} = await http.put<Req>(`${this.url}/${!!url ? url + '/' : ''}${id}`, obj);
    return data;
  }

  public async delete<Req>(id: number, obj?: Req, url?: string) {
    const {data} = await http.delete<T>(`${this.url}/${!!url ? url + '/' : ''}${id}`, {data: obj});
    return data;
  }
}

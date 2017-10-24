/**
 * Created by ekemate on 2017. 02. 23..
 */
import {PaginationMeta} from './pagination-meta';

export class PaginatedResponse<T> {
  data: Array<T>;
  meta: PaginationMeta;

  private static create<T>(c: {new(elem): T}, elem: any): T {
    return new c(elem);
  }

  constructor(response, type) {
    this.meta = new PaginationMeta(response.meta);

    this.data = response.data.map(elem => PaginatedResponse.create(type, elem));
  }
}

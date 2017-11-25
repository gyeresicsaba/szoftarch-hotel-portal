export class PaginationMeta {
  count: number;
  current_page: number;
  links: {next: string};
  per_page: number;
  total: number;
  total_pages: number;

  constructor(meta) {
    this.count = meta.pagination.count;
    this.current_page = meta.pagination.current_page;
    this.links = meta.pagination.links;
    this.per_page = meta.pagination.per_page;
    this.total = meta.pagination.total;
    this.total_pages = meta.pagination.total_pages;
  }
}

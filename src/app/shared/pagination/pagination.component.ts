import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PaginatedResponse} from '../../models/paginated-response';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() elements: PaginatedResponse<any>;
  @Input() page: number;
  @Output() pageChange = new EventEmitter<number>();
  forArray: number[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['elements']) {
      this.forArray = [];
      this.fillForArray();
    }
  }

  private fillForArray() {
    let start = 1;
    let end = 3;

    if (this.elements.meta.total_pages < 3) {
      end = this.elements.meta.total_pages;
    }
    if (this.page > 1) {
      start = this.page - 1;
      if (this.page + 1 < this.elements.meta.total_pages) {
        end = this.page + 1;
      } else {
        end = this.elements.meta.total_pages;
      }
    }

    for (let i = start; i <= end; i++) {
      this.forArray.push(i);
    }
  }

  paginate(page: number) {
    this.page = page;
    this.pageChange.emit(this.page);
  }
}

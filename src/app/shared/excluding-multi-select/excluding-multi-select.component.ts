import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {MultiSelectComponent} from '../multi-select/multi-select.component';

@Component({
  selector: 'app-excluding-multi-select',
  templateUrl: './excluding-multi-select.component.html',
  styleUrls: ['./excluding-multi-select.component.scss']
})
export class ExcludingMultiSelectComponent extends MultiSelectComponent implements OnInit {
  @Input() exclusiveItems: Array<string>;

  constructor(element: ElementRef) {
    super(element);
  }

  ngOnInit() {
    if (!(this.selectedItems instanceof Array)) {
      this.selectedItems = [];
    }
  }

  toggleSelect(item: string) {
    if (this.selectedItems.length === 1 && this.exclusiveItems.indexOf(this.selectedItems[0]) > -1) {
      this.selectedItems = [item];
      this.selectedItemsChange.emit(this.selectedItems);
    } else {
      super.toggleSelect(item);
    }
  }

  exclusiveSelected(item) {
    this.selectedItems = [item];
    this.selectedItemsChange.emit(this.selectedItems);
  }
}

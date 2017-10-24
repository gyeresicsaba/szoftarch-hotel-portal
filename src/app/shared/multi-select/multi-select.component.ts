import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  @Input() items: string[] = [];
  @Input() selectedItems: string[] = [];
  @Output() selectedItemsChange = new EventEmitter<string[]>();
  @Input() showCounterOnly = false;
  protected element: ElementRef;
  isOpen = false;

  //noinspection JSUnusedGlobalSymbols
  @HostListener('document:click', ['$event']) outClick(event: MouseEvent) {
    if (!this.element.nativeElement.contains(event.target) && !(<HTMLElement>event.target).classList.contains('multiselect-icon')) {
      this.isOpen = false;
    }
  }

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit() {
  }

  toggleSelect(item: string) {
    if (!this.selectedItems) {
      this.selectedItems = [];
    }
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      let inserted = false;
      const itemIndex = this.items.indexOf(item);
      for (let i = 0; i < this.selectedItems.length; i++) {
        if (this.items.indexOf(this.selectedItems[i]) > itemIndex) {
          this.selectedItems.splice(i, 0, item);
          inserted = true;
          break;
        }
      }
      if (!inserted) {
        this.selectedItems.push(item);
      }
    }
    this.selectedItemsChange.emit(this.selectedItems);
  }

  caretClick(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

}

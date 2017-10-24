import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit {
  @Input() placeholder? = '';
  @Input() listDisplayAttributes: Array<string> | string;
  @Input() selectedDisplayAttribute: string;
  @Input() selectedItem;
  @Output() selectedItemChange = new EventEmitter();
  @Input() items: Array<any>;
  @Input() disabled? = false;
  @Input() modelAttribute: string;

  selected = false;
  selectedModel;

  //noinspection JSUnusedGlobalSymbols
  @HostListener('document:click', ['$event']) outClick(event: MouseEvent) {
    if ((!this.element.nativeElement.contains(event.target))) {
      this.selected = false;
    }
  }

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.selectedModel = this.items.filter(item => item[this.modelAttribute] === this.selectedItem)[0];
  }

  selectItem(itemModel) {
    this.selectedModel = itemModel;
    this.selectedItem = itemModel[this.modelAttribute];
    this.selectedItemChange.emit(itemModel[this.modelAttribute]);
    this.selected = false;
  }

  getListItemDisplayValue(item): string {
    if (this.listDisplayAttributes instanceof Array) {
      let str = '';
      this.listDisplayAttributes.forEach(attr => {
        if (str.length) {
          str += ' - ';
        }
        str += item[attr];
      });
      return str;
    } else if (typeof this.listDisplayAttributes === 'string') {
      return item[this.listDisplayAttributes];
    } else {
      return 'N/A';
    }
  }

}

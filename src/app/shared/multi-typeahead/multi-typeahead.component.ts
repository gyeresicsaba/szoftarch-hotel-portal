import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ITypeAheadElement, TypeAhead} from '../../models/typeahead';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-multi-typeahead',
  templateUrl: './multi-typeahead.component.html',
  styleUrls: ['./multi-typeahead.component.scss']
})
export class MultiTypeaheadComponent implements OnInit, OnChanges {

  @Input() items = [];
  selected: any;
  @Input() value = '';
  @Output() valueChange = new EventEmitter<ITypeAheadElement>();
  @Output() focusOutEvent = new EventEmitter<string>();
  @Output() searchChanged = new EventEmitter<string>();
  @Input() placeholder?: string;
  @Input() rows? = 2;
  searchControl = new FormControl();
  ownItems: TypeAhead[] = [];

  constructor() {
  }

  ngOnInit() {
    if (this.value) {
      this.searchControl.setValue(this.value);
    }
    this.searchControl.valueChanges.subscribe(() => {
      this.selected = null;
      this.valueChange.emit(this.searchControl.value);
    });
    this.searchControl.valueChanges.debounceTime(500).subscribe(val => this.search(val));
  }

  private search(value) {
    const s = value.split(';');
    this.searchChanged.emit(s[s.length - 1]);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] && !this.selected) {
      this.ownItems = this.items.map(item => new TypeAhead(item));
      if (this.ownItems.length) {
        this.ownItems[0].active = true;
      }
    }
  }

  selectElem(value: ITypeAheadElement) {
    const s = this.searchControl.value.split(';');
    let newString = '';
    for (let i = 0; i !== s.length - 1; i++) {
      newString += s[i] + ';';
    }
    newString += newString.length ? '\n' : '';
    this.searchControl.setValue(newString + value.DisplayValue);
    this.selected = value;
    this.valueChange.emit(this.searchControl.value);
    this.ownItems = [];
  }

  keyUp(event: KeyboardEvent) {
    if (this.ownItems.length) {
      const active = this.ownItems.filter(item => item.active)[0];
      const index = this.ownItems.indexOf(active);
      switch (event.key) {
        case 'Enter':
          event.stopPropagation();
          event.preventDefault();
          this.selectElem(active.value);
          break;
        case 'ArrowUp':
          if (index) {
            active.active = false;
            this.ownItems[index - 1].active = true;
          }
          break;
        case 'ArrowDown':
          if (index < (this.ownItems.length - 1)) {
            active.active = false;
            this.ownItems[index + 1].active = true;
          }
          break;
      }
    } else if (event.key === 'Enter' && this.selected) {
      event.stopPropagation();
      event.preventDefault();
      this.add();
    }
  }

  private add() {
    this.selected = null;
    this.valueChange.emit(null);
    this.reset();
  }

  private reset() {
    this.ownItems = [];
  }

  focusOut() {
    setTimeout(() => {
      this.focusOutEvent.emit(this.searchControl.value);
      this.reset();
    }, 200);
  }
}

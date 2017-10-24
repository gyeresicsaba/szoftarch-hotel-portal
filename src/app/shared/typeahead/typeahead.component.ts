import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs/Rx';
import {ITypeAheadElement, TypeAhead} from '../../models/typeahead';


@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent implements OnInit, OnChanges {
  @Input() items = [];
  @Input() resetSubject = new Subject();
  // https://github.com/angular/angular-cli/issues/2034
  // @Input() selected: ITypeAheadElement;
  @Input() selected: any;
  @Output() selectedChange = new EventEmitter<ITypeAheadElement>();
  @Output() finish = new EventEmitter();
  @Output() searchChanged = new EventEmitter<string>();
  @Output() focusOutEvent = new EventEmitter<string>();
  @Input() placeholder?: string;
  @Input() canBeText?: boolean;
  @Input() canAdd = true;
  searchControl = new FormControl();
  ownItems: TypeAhead[] = [];

  constructor() {
  }

  ngOnInit() {
    if (this.selected) {
      this.searchControl.setValue(this.selected.DisplayValue);
    }
    this.searchControl.valueChanges.subscribe(() => {
      this.selected = null;
      this.selectedChange.emit(null);
    });
    this.searchControl.valueChanges.debounceTime(500).subscribe(value => {
      this.searchChanged.emit(value);
    });
    this.resetSubject.subscribe(() => {
      this.selected = null;
      this.reset();
    });
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
    this.searchControl.setValue(value.DisplayValue);
    this.selected = value;
    this.selectedChange.emit(value);
    this.ownItems = [];
  }

  private add() {
    this.finish.emit();
    this.selected = null;
    this.selectedChange.emit(null);
    this.reset();
  }

  private reset() {
    if (!this.canBeText && !this.selected) {
      this.searchControl.reset();
      this.items = [];
    }
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
    } else if (event.key === 'Enter' && this.selected && this.canAdd) {
      event.stopPropagation();
      event.preventDefault();
      this.add();
    }
  }

  focusOut() {
    setTimeout(() => {
      this.focusOutEvent.emit(this.searchControl.value);
      this.reset();
    }, 200);
  }
}

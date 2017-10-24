import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './spinner/spinner.component';
import {ToastFilterPipe} from '../filters/toast.pipe';
import {MyDatePickerModule} from 'mydatepicker';
import {TypeaheadComponent} from './typeahead/typeahead.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomSelectComponent} from './custom-select/custom-select.component';
import {MultiSelectComponent} from './multi-select/multi-select.component';
import {PaginationComponent} from './pagination/pagination.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ExcludingMultiSelectComponent} from './excluding-multi-select/excluding-multi-select.component';
import {MultiTypeaheadComponent} from './multi-typeahead/multi-typeahead.component';

@NgModule({
  imports: [
    CommonModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    SpinnerComponent,
    ToastFilterPipe,
    TypeaheadComponent,
    MultiSelectComponent,
    CustomSelectComponent,
    PaginationComponent,
    NotFoundComponent,
    ExcludingMultiSelectComponent,
    MultiTypeaheadComponent,
  ],
  exports: [
    SpinnerComponent,
    ToastFilterPipe,
    MyDatePickerModule,
    TypeaheadComponent,
    MultiSelectComponent,
    CustomSelectComponent,
    PaginationComponent,
    NotFoundComponent,
    ExcludingMultiSelectComponent,
    MultiTypeaheadComponent
  ]
})
export class SharedModule {
}

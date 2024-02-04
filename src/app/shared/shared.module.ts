import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { CustomDateFormatPipe } from './pipes/custom-date-format/custom-date-format.pipe';
import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TimestampToTimePipe } from './pipes/timestamp-to-time/timestamp-to-time.pipe';
import { AsyncLoadingPipe } from './pipes/async-loading/async-loading.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FontSizeTextLenghtAdapterDirective } from './directives/font-size-text-lenght-adapter/font-size-text-lenght-adapter.directive';

@NgModule({
  declarations: [
    CustomDateFormatPipe,
    TimeAgoPipe,
    TimestampToTimePipe,
    LoadingComponent,
    AsyncLoadingPipe,
    PaginationComponent,
    FontSizeTextLenghtAdapterDirective
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [
    CustomDateFormatPipe,
    TimeAgoPipe,
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TimestampToTimePipe,
    LoadingComponent,
    AsyncLoadingPipe,
    PaginationComponent,
    FontSizeTextLenghtAdapterDirective
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { CustomDateFormatPipe } from './pipes/custom-date-format/custom-date-format.pipe';
import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TimestampToTimePipe } from './pipes/timestamp-to-time/timestamp-to-time.pipe';

@NgModule({
  declarations: [
    CustomDateFormatPipe,
    TimeAgoPipe,
    TimestampToTimePipe,
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
    TimestampToTimePipe

  ]
})
export class SharedModule { }

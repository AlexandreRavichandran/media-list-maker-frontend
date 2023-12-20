import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomDateFormatPipe } from './pipes/custom-date-format/custom-date-format.pipe';
import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';

@NgModule({
  declarations: [
    CustomDateFormatPipe,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  exports: [
    CustomDateFormatPipe,
    TimeAgoPipe,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomDateFormatPipe } from './pipes/custom-date-format.pipe';

@NgModule({
  declarations: [
    CustomDateFormatPipe
  ],
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  exports: [
    CustomDateFormatPipe,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SharedModule { }

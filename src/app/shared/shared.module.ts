import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { CustomDateFormatPipe } from './pipes/custom-date-format/custom-date-format.pipe';
import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TimestampToTimePipe } from './pipes/timestamp-to-time/timestamp-to-time.pipe';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    CustomDateFormatPipe,
    TimeAgoPipe,
    TimestampToTimePipe,
    LoadingComponent,
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
    LoadingComponent
  ]
})
export class SharedModule { }

import { Component, Input } from '@angular/core';

@Component({
  selector: 'mlm-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  @Input()
  spinnerColor!: string;
}

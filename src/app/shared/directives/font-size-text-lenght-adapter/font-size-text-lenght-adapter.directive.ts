import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[fontSizeByTextLenght]'
})
export class FontSizeTextLenghtAdapterDirective implements OnChanges {

  @Input()
  text!: string;

  @Input()
  minLength!: number;

  @Input()
  defaultFontSize!: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text']) {
      this.updateFontSize();
    }
  }

  updateFontSize(): void {
    let definedSize;
    
    console.log("Lorem ipsum dolor sit amet consectetur".length);

    if (this.text.length < this.minLength) {
      definedSize = this.defaultFontSize;
    } else {
      definedSize = this.defaultFontSize - ((this.text.length - this.minLength) * this.defaultFontSize) / this.text.length;
    }

    this.renderer.setStyle(this.el.nativeElement, 'font-size', `${definedSize}px`);

  }

}

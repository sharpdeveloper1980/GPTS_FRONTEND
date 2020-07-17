import { Directive, ElementRef, HostListener, Output, EventEmitter, Input } from '@angular/core';


@Directive({
  selector: '[appScrollDetect]'
})
export class ScrollDetectDirective {
  @Output() scrolledOver = new EventEmitter<boolean>();
  @Output() scrollerStop = new EventEmitter<boolean>();
  @Input() ElementStop: any; 

  constructor(private el: ElementRef) { }

  @HostListener('window:scroll', ['$event']) doSomething($event: Event) {
    let scrollTop = (this.el.nativeElement.offsetTop + this.el.nativeElement.scrollHeight);
    let windowScroll = window.pageYOffset;
    if (this.el.nativeElement.closest('.scroll-parent')) {
      if (scrollTop < windowScroll) {
        this.scrolledOver.emit(true);
      } else {
        this.scrolledOver.emit(false);
      }
    } else {
      let scrollTop = (this.el.nativeElement.offsetTop + this.el.nativeElement.parentElement.offsetTop - 80);
      if (scrollTop < windowScroll) {
        this.scrolledOver.emit(true);
      } else {
        this.scrolledOver.emit(false);
      }
    }

    if(typeof this.ElementStop === 'object') {
     
     let stopScroll = this.ElementStop.offsetTop - (this.el.nativeElement.scrollHeight + 100);
     if(stopScroll <= windowScroll) {
      this.scrollerStop.emit(true);
     }
     else {
      this.scrollerStop.emit(false);
     }
    }
  }
}

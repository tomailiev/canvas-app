import { Directive, ElementRef, Input, OnChanges, Output, EventEmitter, HostListener } from '@angular/core';
import { IBook } from './interfaces/book';
import { PageFlip } from 'page-flip'

@Directive({
  selector: '[appPageFlip]'
})
export class PageFlipDirective implements OnChanges {

  @Input('appPageFlip') book: IBook;
  @Output() currentPages = new EventEmitter<number>();
  pages: string[];
  pageFlip: any;
  options = {
    showCover: true,
    width: 500,
    height: 700,
    drawShadow: true,
    flippingTime: 700,
    useMouseEvents: false,
  }

  @HostListener('window:keydown.arrowleft') onLeftPress() {
    this.pageFlip.flipPrev('bottom');
  }

  @HostListener('window:keydown.arrowright') onRightPress() {
    this.pageFlip.flipNext('bottom');
  }


  constructor(private el: ElementRef) { }

  ngOnChanges(): void {
    if (this.book) {
      this.pages = this.book.pages.sort((a, b) => a.number - b.number).map(x => x.link);
      this.pageFlip = new PageFlip(this.el.nativeElement, this.options);
      this.pageFlip.loadFromImages(this.pages);
      console.log(this.pageFlip);
      
      this.pageFlip.on('flip', (e) => {
        console.log(e.data);
        
        this.currentPages.emit(e.data);
      })
    }
  }
}

import { AfterViewInit, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/shared/interfaces/book';
import { PageFlip } from 'page-flip'
import { IPage } from 'src/app/shared/interfaces/page';

@Component({
  selector: 'app-page-flip',
  templateUrl: './page-flip.component.html',
  styleUrls: ['./page-flip.component.css']
})
export class PageFlipComponent implements AfterViewInit {


  @Input('appPageFlip') book: IBook;
  @ViewChild('manuscript') el: ElementRef;

  inEdit: boolean;

  pages: string[];
  pageFlip: any;
  options = {
    showCover: true,
    width: 500,
    height: 700,
    drawShadow: true,
    flippingTime: 700,
    useMouseEvents: false,
    // usePortrait: false
  }
  annotClass: string;
  currentEditedPage: IPage;
  currentPageNumber: number;
  left: IPage;
  right: IPage;
  isShow: boolean;

  @HostListener('window:keydown.arrowleft') onLeftPress() {
    this.pageFlip.flipPrev('bottom');
    if (this.isShow) {
      this.left = null;
      this.right = null;
    }
  }

  @HostListener('window:keydown.arrowright') onRightPress() {
    this.pageFlip.flipNext('bottom');
    if (this.isShow) {
      this.left = null;
      this.right = null;
    }
  }


  constructor() { }

  ngAfterViewInit(): void {
    if (this.book) {
      this.pages = this.book.pages.sort((a, b) => a.number - b.number).map(x => x.link);
      this.pageFlip = new PageFlip(this.el.nativeElement, this.options);
      this.pageFlip.loadFromImages(this.pages);
      this.right = this.book.pages.find(x => x.number === 0);
      this.left = null;
      console.log(this.pageFlip);

      this.pageFlip.on('flip', (e) => {
        this.currentPageNumber = e.data;
        if (this.currentPageNumber !== 0) {
          this.left = this.book.pages.find(x => x.number === this.currentPageNumber);
          this.right = this.book.pages.find(x => x.number === this.currentPageNumber + 1);
        } else {
          this.right = this.book.pages.find(x => x.number === this.currentPageNumber);
          this.left = null;
        }
      })
    }
  }


  switchEditMode(): void {
    this.inEdit = !this.inEdit;
  }

  editLeft(): void {
    this.switchEditMode();
    this.annotClass = 'annot-left';
    this.currentEditedPage = this.left;
  }

  editRight(): void {
    this.switchEditMode();
    this.annotClass = 'annot-right';
    this.currentEditedPage = this.right || this.book.pages.find(x => x.number === 0);
  }

}

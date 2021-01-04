import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { IBook } from '../../shared/interfaces/book';
import { IPage } from '../../shared/interfaces/page';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  currentBook: IBook = null;

  constructor(private bookService: BookService) {

  }

  ngOnInit(): void {
    this.bookService.loadBook()
      .subscribe(
        (book: IBook) => {
          this.currentBook = book;
        },
        (err) => console.log(err)
      )
  }




}

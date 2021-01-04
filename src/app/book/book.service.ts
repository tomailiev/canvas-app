import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBook } from '../shared/interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  book: IBook;

  constructor() {
    this.book = {
      author: 'Machaut',
      title: 'Manuscript 1',
      compiler: 'G Banker',
      pages: [
        {
          link: '../assets/img/21.jpeg',
          number: 0,
          annotations: ''
        },
        {
          link: '../assets/img/22v.jpeg',
          number: 1,
          annotations: ''
        },
        {
          link: '../assets/img/23r.jpeg',
          number: 2,
          annotations: ''
        },
        {
          link: '../assets/img/23v.jpeg',
          number: 3,
          annotations: ''
        },
        {
          link: '../assets/img/24r.jpeg',
          number: 4,
          annotations: ''
        },
        {
          link: '../assets/img/24v.jpeg',
          number: 5,
          annotations: ''
        },
        {
          link: '../assets/img/25r.jpeg',
          number: 6,
          annotations: ''
        },
        {
          link: '../assets/img/25v.jpeg',
          number: 7,
          annotations: ''
        },
        {
          link: '../assets/img/26r.jpeg',
          number: 8,
          annotations: ''
        },
        {
          link: '../assets/img/26v.jpeg',
          number: 9,
          annotations: ''
        },
        {
          link: '../assets/img/27r.jpeg',
          number: 10,
          annotations: ''
        },
        {
          link: '../assets/img/27v.jpeg',
          number: 11,
          annotations: ''
        },
      ],
      _id: '1234'
    }
  }

  loadBook(): Observable<IBook> {
    return of(this.book);
  }
}

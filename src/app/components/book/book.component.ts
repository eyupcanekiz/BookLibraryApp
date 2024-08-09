import { Component,OnInit } from '@angular/core';
import { BookService } from './book.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  newBook = {
    bookName: '',
    publisher: '',
    author: '',
    isAvailable: false
  };
  errorMessage: string = '';
  books: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.getBooks();
  }

  onSubmit() {
    this.bookService.addBook(this.newBook).subscribe(
      response => {
        this.books.push(response);
        this.newBook = {
          bookName: '',
          publisher: '',
          author: '',
          isAvailable: false
        };
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }
  getBooks() {
    this.bookService.getBooks().subscribe(
      (data: any[]) => {
        this.books = data;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

}

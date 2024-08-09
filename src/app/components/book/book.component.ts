import { Component, OnInit } from '@angular/core';
import { BookService, Book } from './book.service';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

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
  selectedBook: Book | null = null;
  bookId: string = ''; // To hold the user-entered book ID

  constructor(private bookService: BookService, private authService: AuthService, private router: Router) {}

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
        this.getBooks(); 
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

  getBookById(id: string) {
    this.bookService.getBookById(id).subscribe(
      (book: Book) => {
        this.selectedBook = book;
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { BookService, Book } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  errorMessage: string = '';
  newBook: Book = {
    id: null,
    bookName: '',
    publisher: '',
    author: '',
    isAvailable: false
  };

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe(
      (data: Book[]) => {
        console.log('Books:', data);  // Log data to verify
        this.books = data;
      },
      (error: string) => {
        this.errorMessage = error;
      }
    );
  }

  onSubmit() {
    this.addBook(this.newBook);
  }

  addBook(book: Book) {
    console.log('Adding book:', book);  // Log the book being added
    this.bookService.postBook(book).subscribe(
      (data: Book) => {
        console.log('Book added:', data);
        this.fetchBooks();  // Refresh the book list
        this.newBook = {
          id: null,
          bookName: '',
          publisher: '',
          author: '',
          isAvailable: false
        };  // Reset the form
      },
      (error: string) => {
        this.errorMessage = `Error adding book: ${error}`;
        console.error(this.errorMessage);
      }
    );
  }
}

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

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe(
      (data: Book[]) => {
    
        this.books = data;
      },
      (error: string) => {
        this.errorMessage = error;
      }
    );
  }
}

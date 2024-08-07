import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {
  borrowedBooks: string[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.borrowedBooks = this.bookService.getBorrowedBooks();
  }
}


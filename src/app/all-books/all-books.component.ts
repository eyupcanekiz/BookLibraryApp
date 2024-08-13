import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../components/book/book.service'; // Doğru yolu kontrol edin
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {
  books: Book[] = [];
  errorMessage: string = '';

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getBooks().subscribe(
      (data: Book[]) => {
        this.books = data;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  viewBookDetails(id: string) {
    this.router.navigate(['/all-book-show', id]);
  }
}

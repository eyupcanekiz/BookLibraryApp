import { Component, OnInit } from '@angular/core';
import { BookService, Book } from './book.service';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  newBook = {
    bookName: '',
    publisher: '',
    author: '',
    isAvailable: false,
    stock: '',
    coverImageUrl: "",
    category: ""
    
  };
  errorMessage: string = '';
  books: Book[] = [];
  selectedBook: Book | null = null;
  bookId: string = ''; // To hold the user-entered book ID
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedBooks: any[] = [];

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  onSubmit() {
    this.bookService.addBook(this.newBook).subscribe(
      (response) => {
        this.books.push(response);
        this.newBook = {
          bookName: '',
          publisher: '',
          author: '',
          isAvailable: false,
          stock: '',
          coverImageUrl: "",
          category: ""
        };
        this.getBooks();
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      (data: any[]) => {
        this.books = data;
        this.setPaginated();
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  getBookByName(name: string) {
    this.bookService.getBookByName(name).subscribe(
      (book: Book) => {
        this.selectedBook = book;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  deleteBook(bookName: string) {
    this.bookService.deleteByName(bookName).subscribe(
      (response) => {
        this.books = this.books.filter((book) => book.bookName !== bookName);
        this.setPaginated();
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  setPaginated() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBooks = this.books.slice(startIndex, endIndex);
  }
  goToNextPage(){
    if (this.currentPage * this.itemsPerPage < this.books.length) {
    this.currentPage++;
    this.setPaginated();
    }
  }

  goToPreviousPage(){
    if(this.currentPage>1){
      this.currentPage--;
      this.setPaginated();
    }
  }
  categories: string[] = ['Fiction', 'Non-fiction', 'Science Fiction', 'Biography', 'History', 'Fantasy', 'Mystery', 'Romance', 'Horror'];
}

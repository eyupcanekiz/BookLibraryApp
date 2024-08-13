import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService, Book } from '../components/book/book.service';

@Component({
  selector: 'app-all-book-show',
  templateUrl: './all-book-show.component.html',
  styleUrls: ['./all-book-show.component.scss']
})
export class AllBookShowComponent implements OnInit {
  errorMessage: string = '';
  books: any[] = [];
  selectedBook: Book | null = null;
  bookId: string = '';
  book: Book | null = null;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getBookDetails(id);
    }

  }
  getBookById(id: string) {
    this.bookService.getBookById(id).subscribe(
      (book: Book) => {
        this.selectedBook = book;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
 
}
getBookDetails(id: string) {
  this.bookService.getBookById(id).subscribe(
    (book: Book) => {
      this.book = book;
    },
    (error) => {
      this.errorMessage = 'Kitap bilgileri yüklenemedi: ' + error.message;
    }
  );
}
}

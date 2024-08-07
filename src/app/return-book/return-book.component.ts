import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.scss']
})
export class ReturnBookComponent implements OnInit {
  borrowedBooks: string[] = [];
  bookBeingReturned: string | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.borrowedBooks = this.bookService.getBorrowedBooks();
  }

  returnBook(book: string, index: number): void {
    this.bookBeingReturned = book;

    // Animasyonun tamamlanmasını beklemek için 500ms gecikme ekliyoruz
    setTimeout(() => {
      this.bookService.returnBook(book);
      this.borrowedBooks = this.bookService.getBorrowedBooks();  // Listeyi güncelle
      this.bookBeingReturned = null;  // Animasyon sınıfını temizleyin
    }, 500);  
  }
}

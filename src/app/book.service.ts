import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private borrowedBooks: string[] = [];

  constructor() { }

  addBook(bookTitle: string): string {
    if (this.borrowedBooks.includes(bookTitle)) {
      return `${bookTitle} zaten ödünç alınmış.`;
    } else {
      this.borrowedBooks.push(bookTitle);
      return `${bookTitle} başarıyla ödünç alındı.`;
    }
  }

  getBorrowedBooks() {
    return this.borrowedBooks;
  }
  returnBook(book: string): void {
    this.borrowedBooks = this.borrowedBooks.filter(b => b !== book);
  }
}
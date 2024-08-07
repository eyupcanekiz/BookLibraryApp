import { Component } from '@angular/core';
import { BookService } from '../book.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    constructor(private bookService: BookService) {}

  borrowBook(bookTitle: string) {
    this.bookService.addBook(bookTitle);
  }
}

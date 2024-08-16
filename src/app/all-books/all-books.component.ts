import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../components/book/book.service'; // Doğru yolu kontrol edin
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {
  books: Book[] = [];
  errorMessage: string = '';
  searchTerm: string = '';
  constructor(
     private bookService: BookService,
     private router: Router,
     private spinner: NgxSpinnerService  
    ) {}
  

  ngOnInit(): void {
    this.spinner.show();
    this.getAllBooks();
    
  }

  getAllBooks() {
    this.bookService.getBooks().subscribe(
      (data: Book[]) => {
        this.books = data;
       
        
   
      },
      (error) => {
        this.errorMessage = error.message;
      },
      () => {
        this.spinner.hide(); // İşlem tamamlandığında spinner'ı gizle
      }
    );
  }

  viewBookDetails(name: string) {
    
    
    this.router.navigate(['/all-book-show',name]);
  }
  filteredBooks() {
    return this.books.filter(book => 
      book.bookName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
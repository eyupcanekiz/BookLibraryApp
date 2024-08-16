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
  itemsPerPage: number = 15;
  currentPage: number = 1;
  paginatedBooks: Book[] = [];

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
        this.filterAndPaginateBooks(); // Arama ve sayfalama işlemini birlikte yap
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
    this.router.navigate(['/all-book-show', name]);
  }
  filterAndPaginateBooks() {
    // Tüm kitapları filtrele
    const filtered = this.books.filter(book => 
      book.bookName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    
    // Filtrelenmiş kitapları sayfalara böl
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBooks = filtered.slice(startIndex, endIndex);
  }

  filteredBooks(): Book[] {
    return this.books.filter(book => 
      book.bookName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  goToNextPage(){
    const totalFilteredBooks = this.filteredBooks().length;
    if (this.currentPage * this.itemsPerPage < totalFilteredBooks) {
      this.currentPage++;
      this.filterAndPaginateBooks();
    }
  }

  goToPreviousPage(){
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterAndPaginateBooks();
    }
  }
}

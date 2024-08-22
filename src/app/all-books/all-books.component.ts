import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../components/book/book.service'; // Doğru yolu kontrol edin
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BorrowbookService } from '../components/borrowbook/borrowbook.service';
import { AuthService } from '../components/login/auth.service';

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
  borrowBooks: any[] = [];
  userId: string | undefined;
  userName: string | undefined;
  isAvailable: boolean = true;

  constructor(
    private bookService: BookService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private borrowbookService: BorrowbookService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getToken();
    if (this.userId) {
      this.getUser();
      this.getAllBooks();
    }
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
    const filtered = this.filteredBooks();
    
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

  goToNextPage() {
    const totalFilteredBooks = this.filteredBooks().length;
    if (this.currentPage * this.itemsPerPage < totalFilteredBooks) {
      this.currentPage++;
      this.filterAndPaginateBooks();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterAndPaginateBooks();
    }
  }

 fetchBorrowedBooks(userName: string): void {
    this.borrowbookService.getBorrowedBooks(userName).subscribe(
        (response: { borrowBooks: any[] }) => {
            this.borrowBooks = response.borrowBooks;
            this.updateBookAvailability();  
        },
        (error) => {
            console.error('Hata:', error);
        }
    );
}
  updateBookAvailability(): void {
    
    this.books.forEach(book => book.isAvailable = true);

  
    this.borrowBooks.forEach(borrowedBook => {
        const book = this.books.find(b => b.bookName === borrowedBook.bookName);
        if (book) {
            book.isAvailable = false;
        }
    });
    this.filterAndPaginateBooks();
  }

  getToken() {

    if(typeof window!=='undefined'){
    const token = localStorage.getItem('AuthToken');
    if (token) {
      this.userId = this.authService.extractUserIdFromToken(token);
      console.log(this.userId);
    }
  }
  }

  getUser() {
    if (this.userId) {
      this.authService.getById(this.userId).subscribe(
        (response) => {
          this.userName = response.userName;
          console.log(this.userName);
          if (this.userName) {
            this.fetchBorrowedBooks(this.userName);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}

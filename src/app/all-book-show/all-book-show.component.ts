import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService, Book, Ratings } from '../components/book/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllBookShowService, AllShowBookDto } from './all-book-show.service';
import { AuthService } from '../components/login/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { BorrowbookService } from '../components/borrowbook/borrowbook.service';
import { commentRequest } from './comment-request';
import { commentResponse } from './commentresponse';
import { StarRatingService } from '../star-rating/star-rating.service';
import { UserBookRatingDto } from '../components/book/book.model';

@Component({
  selector: 'app-all-book-show',
  templateUrl: './all-book-show.component.html',
  styleUrls: ['./all-book-show.component.scss']
})
export class AllBookShowComponent implements OnInit {
  errorMessage: string = '';
  currentRating: number = 0;
  books: Book[] = [];
  comments: commentResponse[] = [];
  selectedBook: Book | null = null;
  bookName: string = "";
  publisher: string = "";
  bookId: string = '';
  author: string = "";
  userName: string = "";
  description: string = "";
  coverImageUrl: string = "";
  bookNameDto!: AllShowBookDto;
  stock: any;
  available: boolean = false;
  book: Book | null = null;
  borrowBooks: any[] = [];
  itemsPerPage: number = 15;
  currentPage: number = 1;
  paginatedBooks: Book[] = [];
  searchTerm: string = '';
  averageRating: any = 0;
  ratingCount: any = 0;
  ratings: Ratings[] = [];
  userRating: number = 0;
  newComment: any = { text: '', userName: 'Kullanıcı Adı' };
  isRatingLocked = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private allBookShowService: AllBookShowService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private borrowbookService: BorrowbookService,
  ) {}

  async ngOnInit() {
    await this.getUser();
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.bookName = name;
      this.onGetByName(name);
      await this.loadUserRating(); 
      await this.loadComments(name);
    }
    this.fetchBorrowedBooks(this.userName);
  }

  onGetByName(name: string) {
    this.bookService.getBookByName(name).subscribe({
      next: (response) => {
        this.bookName = response.bookName;
        this.publisher = response.publisher;
        this.author = response.author;
        this.available = response.isAvailable;
        this.stock = response.stock;
        this.coverImageUrl = response.coverImageUrl;
        this.description = response.description;
        this.averageRating = response.averageRating;
        this.ratingCount = response.ratingCount;
        this.ratings = response.ratings;
      
      },
      error: () => {
        this.snackBar.open('Kitap bilgisi alınamadı', 'Close', { duration: 3000 });
      }
    });
  }

  borrowBook(bookName: string) {
    this.bookNameDto = { bookName: bookName };
    this.allBookShowService.addBorrowedBook(this.bookNameDto, this.userName).subscribe({
      next: () => {
        this.snackBar.open("Kitap başarılı bir şekilde ödünç alındı", "Close", { duration: 3000 });
        this.router.navigate(["all-books"]);
      },
      error: () => {
        this.snackBar.open("Kitap ödünç alınamadı", "Close", { duration: 3000 });
      }
    });
  }

  getUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser().subscribe({
        next: (response) => {
          this.userName = response?.userName || "";
          resolve();
        },
        error: () => {
          this.snackBar.open("Lütfen giriş yapınız", "Close", { duration: 3000 });
          reject();
        }
      });
    });
  }

  updateRating(newRating: number) {
    this.currentRating = newRating;
  }

  fetchBorrowedBooks(userName: string): void {
    this.borrowbookService.getBorrowedBooks(userName).subscribe(
      (response: { borrowBooks: any[] }) => {
        this.borrowBooks = response.borrowBooks;
        this.updateBookAvailability();
      }
    );
  }

  updateBookAvailability(): void {
    this.available = true;
    const borrowedBook = this.borrowBooks.find(b => b.bookName === this.bookName);
    if (borrowedBook) {
      this.available = false;
    }
  }

  filteredBooks(): Book[] {
    return this.books.filter(book =>
      book.bookName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  filterAndPaginateBooks() {
    const filtered = this.filteredBooks();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBooks = filtered.slice(startIndex, endIndex);
  }

  addComment(bookName: string) {
    const commentData: commentRequest = {
      comment: this.newComment.text,
      userName: this.userName,
      Status: true
    };
    this.allBookShowService.addComment(bookName, commentData).subscribe(
      () => {
        window.location.reload();
      },
      () => {
        this.translate.get('ERROR').subscribe((res1: string) => {
          this.translate.get('ERROR_OCCURED').subscribe((res2: string) => {
            this.toastr.error(res2, res1);
          });
        });
      }
    );
  }

  loadComments(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.allBookShowService.getComment(name).subscribe(
        (response: commentResponse[]) => {
          this.comments = response;
          resolve();
        },
        () => {
          reject();
          this.handleError();
        }
      );
    });
  }

  private loadUserRating() {

    


        // URL encode bookName and userName to handle special characters
       
        this.bookService.getUserBookRating(this.bookName, this.userName).subscribe({
          next: (response: UserBookRatingDto) => {
            if (response.success) {
              
              this.userRating = response.userRating || 0;
              this.isRatingLocked = true; // Lock rating to prevent change
             
              
            } else {
              this.errorMessage = response.message;
            }
         
          },
          error: (error) => {
            console.error('Error fetching user rating:', error);
            this.errorMessage = 'Değerlendirme alınamadı.';
       
          }
        });
      } 

  
  

  private handleError() {
    this.translate.get('ERROR').subscribe((res1: string) => {
      this.translate.get('ERROR_OCCURED').subscribe((res2: string) => {
        this.toastr.error(res2, res1);
      });
    });
  }
}

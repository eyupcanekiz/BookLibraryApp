import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService, Book, Ratings } from '../components/book/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllBookShowService, AllShowBookDto, /*UserBookRatingDto */} from './all-book-show.service';
import { AuthService } from '../components/login/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { BorrowbookService } from '../components/borrowbook/borrowbook.service';
import { commentRequest } from './comment-request';
import { commentResponse } from './commentresponse';

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
  userRating: number | undefined = undefined;
  newComment: any = { text: '', userName: 'Kullanıcı Adı' };

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private allBookShowService: AllBookShowService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private borrowbookService: BorrowbookService
  ) {}

  async ngOnInit() {
    await this.getUser();
    const name = this.route.snapshot.paramMap.get('name');
    this.onGetByName(name!);
    this.fetchBorrowedBooks(this.userName);
    await this.loadComments(name!);
    // await this.getUserBookRating(name!, this.userName);
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
      error: (error) => {
        this.translate.get('BOOK_INFO_ERROR').subscribe((res: string) => {
          this.toastr.error(res, 'Error');
        });
      }
    });
  }

  borrowBook(bookName: string) {
    this.bookNameDto = { bookName: bookName };
    this.allBookShowService.addBorrowedBook(this.bookNameDto, this.userName).subscribe({
      next: () => {
        this.translate.get('BOOK_BORROW_SUCCESS').subscribe((res: string) => {
          this.toastr.success(res, 'Success');
        });
        this.router.navigate(["all-books"]);
      },
      error: (error) => {
        this.translate.get('BOOK_BORROW_ERROR').subscribe((res: string) => {
          this.toastr.error(res, 'Error');
        });
      }
    });
  }

  getUser(): Promise<void> {
    return new Promise((resolve, rejects) => {
      this.authService.getCurrentUser().subscribe({
        next: (response) => {
          this.userName = response?.userName || "";
          resolve();
        },
        error: () => {
          this.translate.get('LOGIN_REQUIRED').subscribe((res: string) => {
            this.toastr.error(res, 'Error');
          });
          rejects();
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
      (response) => {
        window.location.reload();
      },
      (error) => {
        this.translate.get('ERROR').subscribe((res1: string) => {
          this.translate.get('ERROR_OCCURED').subscribe((res2: string) => {
            this.toastr.error(res2, res1);
          });
        });
      }
    );
  }

 // Yorumları yüklemek için kullanılan metod
loadComments(name: string): Promise<void> {
  return new Promise((resolve, reject) => {
    this.allBookShowService.getComment(name).subscribe(
      (response: commentResponse[]) => {
        this.comments = response;
        resolve();
      },
      (error) => {
        reject();
        this.handleError();
      }
    );
  });
}



// Hataları yönetmek için ortak bir metod
handleError() {
  this.translate.get('ERROR').subscribe((res1: string) => {
    this.translate.get('ERROR_OCCURED').subscribe((res2: string) => {
      this.toastr.error(res2, res1);
    });
  });
}

    
}

  // // Kullanıcının kitaba verdiği değerlendirmeyi almak için yeni metod
  // getUserBookRating(bookName: string, userName: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     this.allBookShowService.ShowUserRating(bookName, userName).subscribe({
  //       next: (response: UserBookRatingDto) => {
  //         if (response.Success) {
  //           this.userRating = response.UserRating;
           
  //         } else {
  //           this.errorMessage = response.Message;
  //         }
  //         resolve();
  //       },
  //       error: (error) => {
  //         console.error('Error fetching user rating:', error);
  //         this.errorMessage = 'Değerlendirme alınamadı.';
  //         reject();
  //       }
  //     });
  //   });
  // }


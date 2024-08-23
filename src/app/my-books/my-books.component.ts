import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../components/book/book.service';
import { FormGroup } from '@angular/forms';
import { MyBookService } from './my-books.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BorrowBookByNameDto } from '../components/borrowbook/borrowbook.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

interface BorrowedBook {
  bookName: string;
  author: string;
  publisher: string;
  isAvailable: boolean;
}

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {
  borrowForm!: FormGroup;
  borrowedBooks: any[] = [];
  userName: string = ''; 
  borrowBookSuccess: boolean = false;
  borrowBookError: boolean = false;
  readOutBooks: any[] = [];
  message: string = "";
  bookName: string = "";

  constructor(
    private myBookService: MyBookService, 
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private bookService: BookService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      this.userName = params.get("name")!;
    });
    this.fetchBorrowedBooks(this.userName);
    this.fetchReadOutBooks(this.userName);
  }

  fetchBorrowedBooks(userName: string): void {
    this.myBookService.getBorrowedBooks(userName).subscribe(
      (response) => {
        this.borrowedBooks = response.borrowBooks;
      },
      (error) => {
        console.error('Hata:', error);
        this.translate.get('FETCH_BORROWED_BOOKS_ERROR').subscribe((res: string) => {
          this.toastr.error(res, 'Error');
        });
      },
      () => {
        this.spinner.hide(); // İşlem tamamlandığında spinner'ı gizle
      }
    );
  }

  fetchReadOutBooks(userName: string): void {
    this.myBookService.getReadOutBooks(userName).subscribe(
      (response) => {
        this.readOutBooks = response.readOutBooks;
      },
      (error) => {
        console.error('Hata:', error);
        this.translate.get('FETCH_READOUT_BOOKS_ERROR').subscribe((res: string) => {
          this.toastr.error(res, 'Error');
        });
      },
      () => {
        this.spinner.hide(); // İşlem tamamlandığında spinner'ı gizle
      }
    );
  }

  removeBorrowedBook(book: BorrowedBook): void {
    const bookDto: BorrowBookByNameDto = { bookName: book.bookName };
    this.myBookService.removeBorrowedBook(bookDto, this.userName).subscribe(
      response => {
        this.translate.get('BOOK_RETURN_SUCCESS').subscribe((res: string) => {
          this.toastr.success(res, 'Success');
        });
        this.fetchBorrowedBooks(this.userName);
      },
      error => {
        console.error('Hata', error);
        this.translate.get('BOOK_RETURN_ERROR').subscribe((res: string) => {
          this.toastr.error(res, 'Error');
        });
      }
    );
  }

  updateBorrowedBook(book: BorrowedBook): void {
    const bookDto: BorrowBookByNameDto = { bookName: book.bookName };
    this.myBookService.updateBorrowedBook(bookDto, this.userName).subscribe(
      response => {
        this.translate.get('BOOK_UPDATE_SUCCESS').subscribe((res: string) => {
          this.toastr.success(res, 'Success');
        });
        this.fetchBorrowedBooks(this.userName);
        this.fetchReadOutBooks(this.userName);
      },
      error => {
        console.error('Güncellenemedi', error);
        this.translate.get('BOOK_UPDATE_ERROR').subscribe((res: string) => {
          this.toastr.error(res, 'Error');
        });
      }
    );
  }
}

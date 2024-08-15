import { Component, OnInit } from '@angular/core';
import { Book } from '../book/book.model';
import { BorrowBookByNameDto, BorrowbookService } from '../borrowbook/borrowbook.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface BorrowedBook {
  bookName: string;
  author: string;
  publisher: string;
  isAvailable: boolean;
}
@Component({
  selector: 'app-borrowbook',
  templateUrl: './borrowbook.component.html',
  styleUrls: ['./borrowbook.component.scss']
})
export class BorrowbookComponent implements OnInit {
  borrowForm!: FormGroup;
  borrowedBooks: any[] = [];
  userName: string = 'HalukAyt'; 
  borrowBookSuccess: boolean = false;
  bookName:string="";
  borrowBookError: boolean = false;
  message: string = '';

  constructor(
    private borrowbookService: BorrowbookService,   
  ) { }

  ngOnInit(): void {

   this.fetchBorrowedBooks(this.userName);
  }

  fetchBorrowedBooks(userName: string): void {
    this.borrowbookService.getBorrowedBooks(userName).subscribe(
    (response) => {
     this.borrowedBooks = response.borrowBooks
  
    },
    (error) => {
       console.error('Hata:', error);
    }
   );
 }

 addBorrowedbook() {
  const bookDto: BorrowBookByNameDto = { bookName: this.bookName };

  this.borrowbookService.addBorrowedBook(bookDto, this.userName).subscribe({
    next: (response) => {
      this.message = response.message;
      this.fetchBorrowedBooks(this.userName)
    },
    error: (error) => {
      this.message = 'Bir hata oluştu: ' + error.message;
    }
  });
}

 removeBorrowedBook(book: BorrowedBook): void {
    if (!this.userName) {
      this.message = 'Kullanıcı adı gereklidir';
      return;
    }

    const bookDto: BorrowBookByNameDto = { bookName: book.bookName };

    this.borrowbookService.removeBorrowedBook(bookDto, this.userName).subscribe(
      response => {
        this.message = response.message || 'Kitap başarıyla geri verildi';
        this.fetchBorrowedBooks(this.userName);
      },
      error => {
        this.message = 'Bir hata oluştu: ' + error.message;
      }
    );
  }

updateBorrowedBook(book:BorrowedBook) {
  if (!this.userName) {
    this.message = 'Kullanıcı adı gereklidir';
    return;
  }

  const bookDto: BorrowBookByNameDto = { bookName: book.bookName };
  this.borrowbookService.updateBorrowedBook(bookDto, this.userName).subscribe
  
  (response => {
    console.log('Güncellendi', response);
    this.message = response.message || 'Kitap başarıyla geri verildi';
    this.fetchBorrowedBooks(this.userName);
  }, error => {
    console.error('Güncellenemedi', error);
  });
}
}

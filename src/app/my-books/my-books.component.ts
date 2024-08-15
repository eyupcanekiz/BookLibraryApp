import { Component, OnInit } from '@angular/core';
import { BookService ,Book} from '../components/book/book.service';
import { FormGroup } from '@angular/forms';
import { MyBookService } from './my-books.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {
  borrowForm!: FormGroup;
  borrowedBooks: any[] = [];
  userName: string = ''; 
  borrowBookSuccess: boolean = false;bookName:string="";
  borrowBookError: boolean = false;
  readOutBooks: any[] = [];

  constructor(
    private myBookService: MyBookService, 
    private route : ActivatedRoute ,
    private spinner: NgxSpinnerService ,
    private bookService: BookService, 
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.paramMap.subscribe(params=>{
      this.userName = params.get("name")!;
    })
   this.fetchBorrowedBooks(this.userName);
   this.fetchReadOutBooks(this.userName);
  }

  fetchBorrowedBooks(userName: string): void {
    this.myBookService.getBorrowedBooks(userName).subscribe(
    (response) => {
     this.borrowedBooks = response.borrowBooks
  
    },
    (error) => {
       console.error('Hata:', error);
    },
    () => {
      this.spinner.hide(); // İşlem tamamlandığında spinner'ı gizle
    }
   );
 }
 
 fetchReadOutBooks(userName: string): void {
  this.myBookService.getReadOutBooks(userName).subscribe(
  (response) => {

   this.readOutBooks = response.readOutBooks; // Doğru alana atandığından emin olun

  },
  (error) => {
     console.error('Hata:', error);
  }
 );
}

}


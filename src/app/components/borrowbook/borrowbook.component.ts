import { Component, OnInit } from '@angular/core';
import { Book } from '../book/book.model';
import { BorrowbookService } from '../borrowbook/borrowbook.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BorrowBookModel } from './borrowbook.model';

@Component({
  selector: 'app-borrowbook',
  templateUrl: './borrowbook.component.html',
  styleUrls: ['./borrowbook.component.scss']
})
export class BorrowbookComponent implements OnInit {
  borrowForm!: FormGroup;
  borrowedBooks: any[] = [];
  userName: string = 'HalukAyt'; 
  borrowBookSuccess: boolean = false;bookName:string="";
  borrowBookError: boolean = false;

  constructor(
    private borrowbookService: BorrowbookService,   
  ) { }

  ngOnInit(): void {

   this.fetchBorrowedBooks(this.userName);
  }

  fetchBorrowedBooks(userName: string): void {
    this.borrowbookService.getBorrowedBooks(userName).subscribe(
    (response) => {
console.log(response.borrowBooks)
     this.borrowedBooks = response.borrowBooks
  
    },
    (error) => {
       console.error('Hata:', error);
    }
   );
 }

}

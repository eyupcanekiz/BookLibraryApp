import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { FormGroup } from '@angular/forms';
import { MyBookService } from './my-books.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {
  borrowForm!: FormGroup;
  borrowedBooks: any[] = [];
  userName: string = 'HalukAyt'; 
  borrowBookSuccess: boolean = false;bookName:string="";
  borrowBookError: boolean = false;

  constructor(
    private myBookService: MyBookService,   
  ) { }

  ngOnInit(): void {

   this.fetchBorrowedBooks(this.userName);
  }

  fetchBorrowedBooks(userName: string): void {
    this.myBookService.getBorrowedBooks(userName).subscribe(
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


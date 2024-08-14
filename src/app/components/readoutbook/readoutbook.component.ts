import { Component, OnInit } from '@angular/core';
import { ReadoutBookService } from './readoutbook.service';
import { Book } from '../book/book.model';

@Component({
  selector: 'app-readoutbook',
  templateUrl: './readoutbook.component.html',
  styleUrls: ['./readoutbook.component.scss']
})
export class ReadoutBookComponent implements OnInit {
  readOutBooks: any[] = [];
  userName: string = 'HalukAyt';

  constructor(private readoutBookService: ReadoutBookService) {}

  ngOnInit(): void {

     this.fetchReadOutBooks(this.userName);
  }

    fetchReadOutBooks(userName: string): void {
      this.readoutBookService.getReadOutBooks(userName).subscribe(
      (response) => {

       this.readOutBooks = response.readOutBooks; // Doğru alana atandığından emin olun
    
      },
      (error) => {
         console.error('Hata:', error);
      }
     );
   }
  
  
}

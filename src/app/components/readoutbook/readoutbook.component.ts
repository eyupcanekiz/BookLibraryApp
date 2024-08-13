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
  userId: string = '66b9d721ff3df6d3d967360a';

  constructor(private readoutBookService: ReadoutBookService) {}

  ngOnInit(): void {

    this.fetchReadOutBooks(this.userId);
  }

  fetchReadOutBooks(userId: string): void {
    this.readoutBookService.getReadOutBooks(userId).subscribe(
      (response) => {

        this.readOutBooks = response.readOutBooks; // Doğru alana atandığından emin olun
    
      },
      (error) => {
        console.error('Hata:', error);
      }
    );
  }
  
  
}

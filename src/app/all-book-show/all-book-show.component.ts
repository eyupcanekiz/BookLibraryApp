import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService, Book } from '../components/book/book.service';
import { response } from 'express';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllBookShowService, AllShowBookDto } from './all-book-show.service';

@Component({
  selector: 'app-all-book-show',
  templateUrl: './all-book-show.component.html',
  styleUrls: ['./all-book-show.component.scss']
})
export class AllBookShowComponent implements OnInit {
  errorMessage: string = '';
  books: any[] = [];
  selectedBook: Book | null = null;
  bookName:string ="";
  publisher:string =""
  bookId: string = '';
  author:string ="";
  userName:string="Alperen";
  bookNameDto!:AllShowBookDto;
  
  available : boolean = false;
  book: Book | null = null;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private snackBar:MatSnackBar,
    private allBookShowService:AllBookShowService,
    private router : Router,
  

  ) {}

  ngOnInit(){
   
    const name = this.route.snapshot.paramMap.get('name');
    this.onGetByName(name!);
    
  
   }
  onGetByName(name:string){
    this.bookService.getBookByName(name).subscribe(
      {
        next:(response) =>{
          this.bookName = response.bookName
          this.publisher =response.publisher
          this.author =response.author
          this.available=response.isAvailable
      
        },
        error:(error) =>{
          this.snackBar.open('Şifreler eşleşmiyor', 'Close', { duration: 3000 });
          console.log(error)
        }
      }
    )
  }
  borrowBook(bookName:string){
    
    this.bookNameDto={bookName :bookName}
    console.log(this.bookNameDto.bookName);
    
    this.allBookShowService.addBorrowedBook(this.bookNameDto,this.userName).subscribe({
      next:()=>{
        this.snackBar.open("Kitap Basarili bir sekilde odunc alindi","Close",{duration:3000});
        this.router.navigate(["all-books"]);

      },
      error:(error)=>{
        this.snackBar.open("Kitap odunc alinamadi")
        console.log(error);
        
      }
    })
    
  }


}



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService, Book } from '../components/book/book.service';
import { response } from 'express';
import { error, log } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllBookShowService, AllShowBookDto } from './all-book-show.service';
import { AuthService } from '../components/login/auth.service';
import { resolve } from 'path';
import { rejects } from 'assert';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { HttpClient } from '@angular/common/http';
import { BorrowbookService } from '../components/borrowbook/borrowbook.service';
import { commentResponse } from './commentresponse';
import { commentRequest } from './comment-request';



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
  bookName:string ="";
  publisher:string =""
  bookId: string = '';
  author:string ="";
  userName:string="";
  description:string="";
  coverImageUrl :string =""
  bookNameDto!:AllShowBookDto;
  stock: any;
  available : boolean = false;
  book: Book | null = null;
  borrowBooks: any[] = [];
  itemsPerPage: number = 15;
  currentPage: number = 1;
  paginatedBooks: Book[] = [];
  searchTerm: string = '';
  averageRating: any = 0;
  ratingCount: any = 0;
  ratings: any[] =[];

  newComment: any = { text: '', userName: 'Kullanıcı Adı' };
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private snackBar:MatSnackBar,
    private allBookShowService:AllBookShowService,
    private router : Router,
    private authService:AuthService,

    private http: HttpClient,

    private borrowbookService: BorrowbookService
  


  ) {}

   async ngOnInit(){
    await this.getUser();
    const name = this.route.snapshot.paramMap.get('name');
    this.onGetByName(name!);
    this.fetchBorrowedBooks(this.userName);
    await this.loadComments(name!);
    console.log(this.comments);
}
   
  onGetByName(name:string){
    this.bookService.getBookByName(name).subscribe(
      {
        next:(response) =>{
          this.bookName = response.bookName
          this.publisher =response.publisher
          this.author =response.author
          this.available=response.isAvailable
          this.stock = response.stock
          this.coverImageUrl = response.coverImageUrl
          this.description= response.description
          this.averageRating = response.averageRating
          this.ratingCount = response.ratingCount
          this.ratings =response.ratings  
       
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
  getUser():Promise<void>{
    return new Promise((resolve,rejects)=>{
    this.authService.getCurrentUser().subscribe({
      next:(response)=>{
        this.userName=response?.userName || ""
       
        resolve();
        
      },
      error:()=>{
       this.snackBar.open("Lütfen giriş yapininiz ","Close",{duration:3000});
      rejects();        
      }
    })
  })

    
  }

  updateRating(newRating: number) {
    this.currentRating = newRating;
  }
  fetchBorrowedBooks(userName: string): void {
    this.borrowbookService.getBorrowedBooks(userName).subscribe(
        (response: { borrowBooks: any[] }) => {
            this.borrowBooks = response.borrowBooks;
            this.updateBookAvailability();  
        },
        (error) => {
            console.error('Hata:', error);
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

  loadComments(name:string):Promise<void> {
    return new Promise((resolve,rejects)=>{
   this.allBookShowService.getComment(name).subscribe(
     (response:commentResponse[])=>{
      this.comments = response;
      resolve(); 
      
     },
     (error)=>{
        rejects();
     }
    
    )
  });
  }
  addComment(bookName:string) {
    const commentData :commentRequest = {
      comment: this.newComment.text,
      userName:this.userName,
      Status:true

    };
    this.allBookShowService.addComment(bookName,commentData).subscribe(
      (response) => {
        console.log(response);
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
    
}




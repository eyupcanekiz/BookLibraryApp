import { Component, OnInit } from '@angular/core';
import { Book } from '../book/book.model';
import { BorrowbookService } from '../borrowbook/borrowbook.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-borrowbook',
  templateUrl: './borrowbook.component.html',
  styleUrls: ['./borrowbook.component.scss']
})
export class BorrowbookComponent implements OnInit {
  borrowForm!: FormGroup;
  borrowedBooks: Book[] = [];
  userId: string = '66b9d721ff3df6d3d967360a'; // Hardcoded user ID for now
  borrowBookSuccess: boolean = false;
  borrowBookError: boolean = false;

  constructor(
    private borrowbookService: BorrowbookService,   
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.borrowForm = this.fb.group({
      bookId: ['', Validators.required] // Validator eklendi
    });
    this.fetchBorrowedBooks(); // Fetch the list of borrowed books on component initialization
  }

  onSubmit(): void {
    if (this.borrowForm.valid) {
      const bookId = this.borrowForm.get('bookId')?.value;
      if (bookId) {
        this.borrowBook(bookId); // Call the borrowBook method with the book ID from the form
      }
    } else {
      console.error('Form is not valid');
    }
  }

  // Fetches the list of borrowed books for the user
  fetchBorrowedBooks(): void {
    this.borrowbookService.getBorrowedBooks(this.userId).subscribe({
      next: (books: Book[]) => {
        // Hatalı kitapları filtrele ve ekrana yazdırma
        this.borrowedBooks = books.filter(book => !!book); 
      },
      error: (err) => {
        console.error('Error fetching borrowed books', err);
      }
    });
  }

  // Handles borrowing a book and refreshing the borrowed books list
  borrowBook(bookId: string): void {
    this.borrowbookService.addBorrowedBook(bookId, this.userId).subscribe({
      next: () => {
        this.borrowBookSuccess = true;
        this.borrowBookError = false;
        this.fetchBorrowedBooks(); // Refresh the list after successfully borrowing a book
      },
      error: (error: string) => {
        console.log('Error borrowing book', error);
        this.borrowBookError = true;
        this.borrowBookSuccess = false;
      }
    });
  }

  // Handles removing a borrowed book and refreshing the borrowed books list
  removeBorrowedBook(bookId: string): void {
    this.borrowbookService.removeBorrowedBook(this.userId, bookId).subscribe({
      next: () => {
        this.fetchBorrowedBooks(); // Refresh the list after successfully removing a book
        console.log('Kitap başarıyla geri verildi');
      },
      error: (error: string) => {
        console.error('Kitap geri verilirken hata oluştu', error);
      }
    });
  }
}

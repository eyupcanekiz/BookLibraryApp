import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { BookService } from './book.service';

@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BookComponent
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }

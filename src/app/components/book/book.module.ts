import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { BookService } from './book.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BookComponent
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }

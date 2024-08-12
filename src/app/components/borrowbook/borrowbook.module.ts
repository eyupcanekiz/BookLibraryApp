import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowbookComponent } from './borrowbook.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BorrowbookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BorrowbookModule { }

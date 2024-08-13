import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadoutBookComponent } from './readoutbook.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReadoutBookComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ReadoutbookModule { }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  bookForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      publisher: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addBook(): void {
    if (this.bookForm.valid) {
      console.log('Kitap Eklendi:', this.bookForm.value);
      // Kitap ekleme işlemini burada gerçekleştirin
    }
  }
}

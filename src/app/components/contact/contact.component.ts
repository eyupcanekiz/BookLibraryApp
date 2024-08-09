import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { contactModel } from './contactModel';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      Name: ['', Validators.required],
      EmailAddress: ['', [Validators.required, Validators.email]],
      Phone: ['', Validators.required],
      Message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData: contactModel = this.contactForm.value;
      this.contactService.sendContactForm(formData).subscribe({
        next: (response) => {
          console.log('Sunucu yanıtı:', response);
          this.snackBar.open('Mesaj başarıyla gönderildi', 'Kapat', { duration: 3000 });
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('HTTP Hatası:', error);
          this.snackBar.open('Mesaj gönderilemedi', 'Kapat', { duration: 3000 });
        }
      });
    }}

}
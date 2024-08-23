import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { contactModel } from './contactModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
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
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 500);
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
          this.toastr.success(this.translate.instant('MESSAGE_SENT_SUCCESS'));
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('HTTP Hatası:', error);
          this.toastr.error(this.translate.instant('MESSAGE_SENT_ERROR'));
        }
      });
    }
  }

}
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Dosya işlemlerini burada gerçekleştirebilirsiniz (örneğin, sunucuya yüklemek için)
      console.log('Selected file:', file);
    }
  }
}

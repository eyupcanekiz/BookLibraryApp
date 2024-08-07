import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit{
  user: any;
  profileImageUrl: string | ArrayBuffer | null = null;
  isImageUploaded: boolean = false;  // Fotoğraf yüklendikten sonra yazıyı gizlemek için kullanılan değişken

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.user = navigation.extras.state['user'];
      console.log('Received User Data:', this.user);
    } else {
      console.error("Kullanıcı bilgileri alınamadı.");
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImageUrl = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);

      // Dosyayı sunucuya yükleyin ve başarıyla yüklendiğinde buton yazısını gizleyin
      this.uploadProfileImage(file);
    }
  }
  uploadProfileImage(file: File): void {
    // Simülasyon: Yüklemenin başarılı olduğunu varsayalım
    setTimeout(() => {
      console.log('Simulated upload successful');
      this.isImageUploaded = true;  // Buton yazısını gizle
    }, 1000);
  
    // Gerçek API çağrısı şu anda yorum satırına alınmış durumda
    /*
    const formData = new FormData();
    formData.append('profileImage', file);
  
    const apiUrl = 'https://api.example.com/upload-profile-image';
  
    this.http.post(apiUrl, formData).subscribe({
      next: (response) => {
        console.log('Upload successful:', response);
        this.isImageUploaded = true;
      },
      error: (error) => {
        console.error('Upload failed:', error);
      }
    });
    */
  }
  
  logout(): void {
    localStorage.removeItem('AuthToken');
    this.router.navigate(['/login']);
  }
}


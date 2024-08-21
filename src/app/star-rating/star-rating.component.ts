import { Component, Input } from '@angular/core';
import { StarRatingService } from './star-rating.service'; // Yolu ayarlayın
import { RateBookResultDto } from './star-rating.model'; // Yolu ayarlayın

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  bookName: string = '1984';  // Kitap adı, dışarıdan alınır
  userName: string = 'HalukAyt';  // Kullanıcı adı, dışarıdan alınır
  currentRating = 0;  // Başlangıç puanı sıfır
  stars = [false, false, false, false, false];  // 5 yıldız
  isRatingLocked = false;

  constructor(private starRatingService: StarRatingService) {}

  setRating(rating: number) {
    if (!this.isRatingLocked) {
      this.currentRating = rating;  // Verilen puanı ayarla
      this.isRatingLocked = true;   // Puanlama yapıldıktan sonra kilitle
      this.sendRatingToServer();    // API'ye puanı gönder
    }
  }

  highlightStars(starIndex: number) {
    if (!this.isRatingLocked) {
      this.currentRating = starIndex;  // Üzerine gelince o kadar yıldızı doldur
    }
  }

  clearHighlight() {
    if (!this.isRatingLocked) {
      this.currentRating = 0;  // Yıldızlardan çıkınca, puanı sıfırla
    }
  }

  private sendRatingToServer() {
    this.starRatingService.rateBook(this.bookName, this.currentRating, this.userName).subscribe({
      next: (response: RateBookResultDto) => {
        if (response.Success) {
          alert('Puan başarıyla eklendi.');
        } else {
          alert(`Puan eklenirken hata oluştu: ${response.Message}`);
        }
      },
      error: (err) => {
        console.error('Puan gönderilirken hata:', err);
        alert('Puan gönderilirken bir hata oluştu.');
      }
    });
  }
}

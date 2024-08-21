import { Component } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  currentRating = 0;  // Başlangıç puanı sıfır
  stars = [false, false, false, false, false];  // 5 yıldız
  isRatingLocked = false;
  setRating(rating: number) {
    if (!this.isRatingLocked) {
      this.currentRating = rating;  // Verilen puanı ayarla
      this.isRatingLocked = true;   // Puanlama yapıldıktan sonra kilitle
    } // Verilen puanı ayarla
  }

  highlightStars(starIndex: number) {
    if (!this.isRatingLocked) {
      this.currentRating = starIndex;  // Üzerine gelince o kadar yıldızı doldur
    }  // Üzerine gelince o kadar yıldızı doldur
  }

  clearHighlight() {
    if (!this.isRatingLocked) {
      this.currentRating = 0;  // Yıldızlardan çıkınca, puanı sıfırla
    }
  }
}

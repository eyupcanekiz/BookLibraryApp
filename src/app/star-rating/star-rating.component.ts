import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() bookId: number = 0; // Kitap ID'si
  @Output() ratingChange = new EventEmitter<number>();
  stars: number[] = [1, 2, 3, 4, 5];
  hoveredRating: number = 0;

  constructor(private http: HttpClient) {}

  // Kullanıcının seçtiği puanı belirler ve buçuklu değerlere yuvarlar
  rate(star: number) {
    this.rating = this.hoveredRating || this.roundToHalf(star);
    this.ratingChange.emit(this.rating);

    this.http.post('/api/rate-book', { rating: this.rating, bookId: this.bookId }) .subscribe
    (response => { console.log('Rating saved:', response); });
  }

  // Puan önizlemesini buçuklu değerlere göre yapar
  previewRating(star: number, event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percent = x / rect.width;
    const approximateRating = star - 1 + percent;

    this.hoveredRating = this.roundToHalf(approximateRating);
  }

  onMouseMove(event: MouseEvent) {
    if (this.hoveredRating) {
      this.previewRating(Math.ceil(this.hoveredRating), event);
    }
  }

  onMouseLeave() {
    this.hoveredRating = 0;
  }

  // Buçuklu değerlere yuvarlama fonksiyonu
  private roundToHalf(value: number): number {
    return Math.round(value * 2) / 2;
  }
}

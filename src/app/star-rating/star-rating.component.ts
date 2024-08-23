import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { StarRatingService } from './star-rating.service'; 
import { RateBookResultDto, UserBookRatingDto } from './star-rating.model'; 

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit, OnChanges {
  @Input() bookName: string = '';  
  @Input() userName: string = '';  
  currentRating: number = 0;  
  stars = [false, false, false, false, false];  
  isRatingLocked = false;
  averageRating!: number;
  errorMessage: string = "";

  constructor(private starRatingService: StarRatingService) {}

  ngOnInit(): void {
    this.loadUserRating(); // Fetch user rating on initialization
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookName'] && changes['bookName'].currentValue) {
      this.loadUserRating(); // Fetch user rating when bookName changes
    }
    if (changes['userName'] && changes['userName'].currentValue) {
      this.loadUserRating(); // Fetch user rating when userName changes
    }
  }

  setRating(rating: number) {
    if (!this.isRatingLocked) {
      this.currentRating = rating;  
      this.isRatingLocked = true;   
      this.sendRatingToServer();    
    }
  }

  highlightStars(starIndex: number) {
    if (!this.isRatingLocked) {
      this.currentRating = starIndex;  
    }
  }

  clearHighlight() {
    if (!this.isRatingLocked) {
      this.currentRating = 0;  
    }
  }

  private sendRatingToServer() {
    this.starRatingService.rateBook(this.bookName, this.currentRating, this.userName).subscribe({
      next: (response: RateBookResultDto) => {
        this.averageRating = response.AverageRating!;
        alert('Puan başarıyla eklendi.');
      },
      error: (err) => {
        console.error('Puan gönderilirken hata:', err);
        alert('Zaten Puan Verilmiş.');
      }
    });
  }

  private loadUserRating(): void {
    this.starRatingService.ShowUserRating(this.bookName, this.userName).subscribe({
      next: (response: UserBookRatingDto) => {
        if (response.Success) {
          this.currentRating = response.UserRating;
          this.isRatingLocked = true; // Lock rating to prevent change
          
        } else {
          this.errorMessage = response.Message;
        }
      },
      error: (error) => {
        console.error('Error fetching user rating:', error);
        this.errorMessage = 'Değerlendirme alınamadı.';
      }
    });
  }
}

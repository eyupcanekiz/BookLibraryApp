import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { StarRatingService } from './star-rating.service'; 
import { RateBookResultDto } from './star-rating.model'; 

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit, OnChanges {
  @Input() bookName: string = '';  
  @Input() userName: string = '';  
  currentRating = 0;  
  stars = [false, false, false, false, false];  
  isRatingLocked = false;
  averageRating!: number;
  constructor(private starRatingService: StarRatingService) {}

  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookName'] && changes['bookName'].currentValue) {
      console.log('ngOnChanges - bookName:', this.bookName);
    }
    if (changes['userName'] && changes['userName'].currentValue) {
      console.log('ngOnChanges - userName:', this.userName);
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
        console.log(response);
          this.averageRating = response.AverageRating!
          alert('Puan başarıyla eklendi.');
  
        
      },
      error: (err) => {
        console.error('Puan gönderilirken hata:', err);
        alert('Zaten Puan Verilmiş.');
      }
    });
  }
}

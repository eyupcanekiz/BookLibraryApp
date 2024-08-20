import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  images = [
    'assets/images/booklibrary1.jpg',
    'assets/images/booklibrary3.jpg',
    'assets/images/booklibrary4.jpg',
    'assets/images/booklibrary7.jpg',
    'assets/images/booklibrary6.jpg'
    
  ];

  currentSlide = 0;

  constructor() { }

  ngOnInit(): void {
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }
}

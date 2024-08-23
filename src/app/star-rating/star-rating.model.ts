export interface RateBookRequest {
    BookName: string;
    Rating: number;
  }
  
  export interface RateBookResultDto {
    Success: boolean;
    AverageRating?: number;
    Message: string;
  }

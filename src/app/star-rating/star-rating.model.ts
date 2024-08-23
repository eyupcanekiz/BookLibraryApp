export interface RateBookRequest {
    BookName: string;
    Rating: number;
  }
  
  export interface RateBookResultDto {
    UserRating: number;
    Success: boolean;
    AverageRating?: number;
    Message: string;
  }

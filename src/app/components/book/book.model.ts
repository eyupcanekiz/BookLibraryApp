export interface Book {
    id: any;   
    bookName: string;
    publisher: string;
    author: string;
    isAvailable: boolean;
    stock: string;
    description: string;
    averageRating: any ;
    ratingCount: any ;
    totalRating: any,
    ratings: any;
  }
  export interface UserBookRatingDto{
    userRating:any;
    message: string;
    success:boolean;
 }
  
export interface RegisterModel {
    UserName: string;
    FullName: string;
    Email: string;
    Password: string;
    PasswordRepeat: string;
    Gender:GenderType ;
  }

  export enum GenderType{
    other,
    male ,
    female
  }
  
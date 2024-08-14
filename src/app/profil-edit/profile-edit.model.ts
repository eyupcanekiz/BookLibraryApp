export interface ProfileEditModel {
    userName: string;
    fullName: string;
    email: string;
    Gender:GenderType;
}
export enum GenderType{
    other,
    male ,
    female
  }
export interface ProfileEditModel {
    fullName: string;
    email: string;
    Gender:GenderType;
}
export enum GenderType{
    other,
    male ,
    female
  }
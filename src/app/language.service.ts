import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage = 'en'; // Varsayılan dil

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.currentLanguage);
  }

  setLanguage(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
  }

  getLanguage(): string {
    return this.currentLanguage;
  }
}

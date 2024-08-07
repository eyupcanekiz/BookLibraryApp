import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Uygulama başlatıldığında dil ayarını yükle
    const currentLanguage = this.languageService.getLanguage();
    this.languageService.setLanguage(currentLanguage);
  }

  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
  }
}

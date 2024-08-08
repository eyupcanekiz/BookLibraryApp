import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'BookLibary';
  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    const currentLanguage = this.languageService.getLanguage();
    this.languageService.setLanguage(currentLanguage);
  }

  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
  }
}

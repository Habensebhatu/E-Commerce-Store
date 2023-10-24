import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  Nederland = 'Nederlands-flag.png'
  Eritrea = 'Eritrea-flag.png'
  English = 'English-flag.png'
  currentLanguage: string = 'Nederlands';

  constructor(private translate: TranslateService){
    translate.setDefaultLang('nl'); 
    translate.use('nl');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    switch (lang) {
      case 'nl':
        this.currentLanguage = 'Nederlands';
        break;
      case 'ti':
        this.currentLanguage = 'ትግሪኛ';
        break;
      case 'en':
        this.currentLanguage = 'English';
        break;
    }
  }
  
  
}

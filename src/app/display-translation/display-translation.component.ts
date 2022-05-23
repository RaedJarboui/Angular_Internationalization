import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../services/translation.service';
import { VariablesGlobales } from '../services/VariablesGlobales ';

@Component({
  selector: 'app-display-translation',
  templateUrl: './display-translation.component.html',
  styleUrls: ['./display-translation.component.sass']
})
export class DisplayTranslationComponent implements OnInit {

  name = 'Translation';
  selectedlang;
  nameTable="product"
  selectedColumn="name"
  translations:any
  loading = true;

  constructor(public translate: TranslateService,public translationService :TranslationService,public variablesGlobales: VariablesGlobales) {
    this.translate.addLangs(['en', 'fr','ar']);
    this.translate.setDefaultLang('en');

    const browserLang = this.variablesGlobales.langue
    this.translate.use(browserLang.match(/en|fr|ar/) ? browserLang : '');
    console.log(browserLang);
    console.log("langue value in display translation comp :",this.variablesGlobales.langue)
  }
  get getlangue()
  {
    console.log("langue value :",this.variablesGlobales.langue)
    
      return this.variablesGlobales.langue;
  }

  ngOnInit(): void {
    
   
  
}

select(value){
 
 
}

}

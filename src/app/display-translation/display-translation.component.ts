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
  constructor(public translate: TranslateService,public translationService :TranslationService,public variablesGlobales: VariablesGlobales) {
    this.translate.addLangs(['en', 'fr','ar']);
    this.translate.setDefaultLang('en');

    const browserLang = this.variablesGlobales.langue
    this.translate.use(browserLang.match(/en|fr|ar/) ? browserLang : 'en');

    console.log(browserLang);
    console.log("langue value in display translation comp :",this.variablesGlobales.langue)
  }

  ngOnInit(): void {
  
}

select(value){
  console.log(value)
  console.log("hi")
  this.translationService.get_Values_FromSelectedLang(this.nameTable,this.selectedColumn,value).subscribe((data)=>{
    console.log(data)
    this.translations=data
  })
}

}

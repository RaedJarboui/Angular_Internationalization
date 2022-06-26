import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';

import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {AppComponent} from '../../../../../app.component';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { TranslationService } from 'src/app/services/translation.service';
import { AuthService } from 'src/app/services/auth.service';
import { VariablesGlobales } from 'src/app/services/VariablesGlobales ';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  currentUser:any
  toggleDrawer() {
    this.globals.toggleDrawer = !this.globals.toggleDrawer;
  }

  constructor(public globals: ThemeOptions,
              public translate: TranslateService, private router: Router,
              public translationService :TranslationService,
              public ngbDropdownMenu: NgbDropdownConfig,private authService: AuthService
              ,public variablesGlobales: VariablesGlobales) {
                const browserLang = this.translate.getBrowserLang();
                if( this.variablesGlobales.langue == ''){
                  this.translate.use(browserLang.match(/en|fr|ar/) ? browserLang : 'fr')
                  }else{
                    this.translate.use(browserLang.match(/en|fr|ar/) ? browserLang : this.variablesGlobales.langue);
              
                  }
    console.log(browserLang);
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser)
    });
   
    if (this.translate.currentLang === 'en') {
      this.ngbDropdownMenu.placement = 'bottom-right';
    } else if (this.translate.currentLang === 'fr') {
      this.ngbDropdownMenu.placement = 'bottom-right';
    } else if (this.translate.currentLang === 'ar') {
      this.ngbDropdownMenu.placement = 'bottom-left';
    }

    if(this.variablesGlobales.langue == ''){
      this.translationService.get_Values_FromSelectedLang("Nationality","FIELD_NAME","null","null","fr").subscribe((data)=>{
        this.variablesGlobales.nationality=data
        console.log("nationality values :",this.variablesGlobales.nationality)
  
        this.translationService.get_Values_FromSelectedLang("Family situation","FIELD_NAME","null","null","fr").subscribe((data)=>{
          this.variablesGlobales.familySituation=data
          console.log("family situation values :",this.variablesGlobales.familySituation)
  
        })

        this.translationService.get_Values_FromSelectedLang("acm_setting_list_values","VALUE_JSON","Branches","name","fr").subscribe((data)=>{
          this.variablesGlobales.branches=data
          console.log("family situation values :",this.variablesGlobales.familySituation)
  
        })

        this.translationService.get_Values_FromSelectedLang("acm_setting_list_values","VALUE_JSON","Relationship","name","fr").subscribe((data)=>{
          this.variablesGlobales.relationship=data
          console.log("family situation values :",this.variablesGlobales.familySituation)
  
        })
        
        this.translationService.findAddressListValue({"addressListId": 1}).subscribe((data)=>{
          for(var i=0;i<data.length;i++){
            this.variablesGlobales.countries.push(data[i].name)
          }
          //this.variablesGlobales.countries=data
          console.log("countrie values :",this.variablesGlobales.countries)

        })

      })
    }
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/pages/login-boxed']);
  }


  langFR() {
    this.variablesGlobales.country=[]
    this.variablesGlobales.region=[]
    this.variablesGlobales.city=[]
    this.variablesGlobales.district=[]

   
    this.translate.use('fr');
    this.ngbDropdownMenu.placement = 'bottom-right';
    localStorage.setItem('lang', 'fr');
    this.variablesGlobales.langue='fr'

    console.log("selected langue via service :",this.variablesGlobales.langue)
    this.translationService.get_Values_FromSelectedLang("Nationality","FIELD_NAME","null","null",this.variablesGlobales.langue).subscribe((data)=>{
      this.variablesGlobales.nationality=data
      console.log("nationality values :",this.variablesGlobales.nationality)

      this.translationService.get_Values_FromSelectedLang("Family situation","FIELD_NAME","null","null",this.variablesGlobales.langue).subscribe((data)=>{
        this.variablesGlobales.familySituation=data
        console.log("family situation values :",this.variablesGlobales.familySituation)


        this.translationService.get_Values_FromSelectedLang("acm_setting_list_values","VALUE_JSON","Branches","name",this.variablesGlobales.langue).subscribe((data)=>{
          this.variablesGlobales.branches=data
          console.log("family situation values :",this.variablesGlobales.familySituation)
  
        })

        this.translationService.get_Values_FromSelectedLang("acm_setting_list_values","VALUE_JSON","Relationship","name",this.variablesGlobales.langue).subscribe((data)=>{
          this.variablesGlobales.relationship=data
          console.log("family situation values :",this.variablesGlobales.familySituation)
  
        })
       

          this.translationService.readAcmAddressTranslation(this.variablesGlobales.countries,'fr').subscribe((data)=>{
          //this.regions=data
          this.variablesGlobales.country=data
          console.log("data countries french :",data)
          console.log("data countries french :",this.variablesGlobales.country)
          console.log("data countries values :",this.variablesGlobales.countries)


    

          })
  
      })
    })
  }

  langEN() {
    this.variablesGlobales.country=[]
    this.variablesGlobales.region=[]
    this.variablesGlobales.city=[]
    this.variablesGlobales.district=[]
    
    this.translate.use('en');
    this.ngbDropdownMenu.placement = 'bottom-right';
    localStorage.setItem('lang', 'en');
    this.variablesGlobales.langue='en'

    console.log("selected langue via service :",this.variablesGlobales.langue)
    this.translationService.get_Values_FromSelectedLang("Nationality","FIELD_NAME","null","null",this.variablesGlobales.langue).subscribe((data)=>{
      this.variablesGlobales.nationality=data
      console.log("nationality values :",this.variablesGlobales.nationality)

      this.translationService.get_Values_FromSelectedLang("Family situation","FIELD_NAME","null","null",this.variablesGlobales.langue).subscribe((data)=>{
        this.variablesGlobales.familySituation=data
        console.log("family situation values :",this.variablesGlobales.familySituation)

        this.translationService.get_Values_FromSelectedLang("acm_setting_list_values","VALUE_JSON","Branches","name",this.variablesGlobales.langue).subscribe((data)=>{
          this.variablesGlobales.branches=data
          console.log("family situation values :",this.variablesGlobales.familySituation)
  
        })

        this.translationService.get_Values_FromSelectedLang("acm_setting_list_values","VALUE_JSON","Relationship","name",this.variablesGlobales.langue).subscribe((data)=>{
          this.variablesGlobales.relationship=data
          console.log("relationships values :",this.variablesGlobales.relationship)
  
        })
       
        this.translationService.readAcmAddressTranslation(this.variablesGlobales.countries,'en').subscribe((data)=>{
          this.variablesGlobales.country=data
          console.log("data countries english :",data)
          console.log("data country english :", this.variablesGlobales.country)
          console.log("data countries values :",this.variablesGlobales.countries)

          })

      })
    })
  }

  langAR() {
    this.variablesGlobales.country=[]
    this.variablesGlobales.region=[]
    this.variablesGlobales.city=[]
    this.variablesGlobales.district=[]
  

    this.translate.use('ar');
    this.ngbDropdownMenu.placement = 'bottom-left';
    localStorage.setItem('lang', 'ar');
    this.variablesGlobales.langue='ar'


    console.log("selected langue via service :",this.variablesGlobales.langue)
    this.translationService.get_Values_FromSelectedLang("Nationality","FIELD_NAME","null","null",this.variablesGlobales.langue).subscribe((data)=>{
      this.variablesGlobales.nationality=data
      console.log("nationality values :",this.variablesGlobales.nationality)

      this.translationService.get_Values_FromSelectedLang("Family situation","FIELD_NAME","null","null",this.variablesGlobales.langue).subscribe((data)=>{
        this.variablesGlobales.familySituation=data
        console.log("family situation values :",this.variablesGlobales.familySituation)
        this.translationService.get_Values_FromSelectedLang("acm_setting_list_values","VALUE_JSON","Branches","name",this.variablesGlobales.langue).subscribe((data)=>{
          this.variablesGlobales.branches=data
          console.log("family situation values :",this.variablesGlobales.familySituation)
  
        })

        this.translationService.get_Values_FromSelectedLang("acm_setting_list_values","VALUE_JSON","Relationship","name",this.variablesGlobales.langue).subscribe((data)=>{
          this.variablesGlobales.relationship=data
          console.log("relationships values :",this.variablesGlobales.relationship)
  
        })
       
        this.translationService.readAcmAddressTranslation(this.variablesGlobales.countries,'ar').subscribe((data)=>{
          //this.regions=data
          this.variablesGlobales.country=data

          console.log("data countries arabic :",data) 
          console.log("data country arabic :", this.variablesGlobales.country)
          console.log("data countries values :",this.variablesGlobales.countries)

          })

      })
    })
  }
    
  changePwdComponent() {
   
}
 
}

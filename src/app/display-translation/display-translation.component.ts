import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  customerIndivForm: FormGroup;
  customerOrganizartionForm: FormGroup;
  customerGroupForm: FormGroup;
  customerRelationShipForm: FormGroup;
  customerLinkGroupeForm: FormGroup;
  customerLinkOrgForm: FormGroup;
  public expandedCustomer = true;
  public expandedCustomerGrp = true;
  public expandedCustomerLinkGrp = true;
  public expandedCustomerLink = true;
  public expandedAddress = true;
  public expandedRelationships = true;
  public expandedAddressGrp = true;
  public expandedRelationshipsGrp = true;
  public dateH: NgbDateStruct;
  public dateG: NgbDate;
  public expirydateG: NgbDate;
  public expirydateH: NgbDateStruct;
  public customerIndiv: boolean;
  public customerOrganitation: boolean;
  public customerGroup: boolean;
  public resident = true;
  public addRelation = true;
  public addLink = true;
  public updateMode = true;
  public showAccountPortfolio = true;
  public nationalityIdMask;
  public residentIdyMask;
  public telephoneMask;
  public mobileMask;
  public emailMask;
  public showKyc = true;
  updateId = 0;

  public kycForm: FormGroup;
  countries
  country
  region
  regions
  city
  cities
  district : any;
  districts
  addressType
  settingaddress
  addressList


  public todayGreg: NgbDate;
  public todayHijri: NgbDateStruct;
  public nombreMembersMax: number;
  public nombreMembersMin: number;
  public relationShipTypeForm: FormGroup;
  public categoryCustomerLinkRelation: string;
  public customerLinkCategoryParam = '';
  public empty = false;
  public emptyExpiry = false;
  public modeGuarantor = false;
  public currentPath = 'customer-management';
  constructor(public translate: TranslateService,public translationService :TranslationService,
    public variablesGlobales: VariablesGlobales, public formBuilder: FormBuilder,
    public router: Router,public modal: NgbModal,
    public route: ActivatedRoute
    ) {
    this.translate.addLangs(['en', 'fr','ar']);
    this.translate.setDefaultLang('en');

    const browserLang = this.variablesGlobales.langue
    this.translate.use(browserLang.match(/en|fr|ar/) ? browserLang : this.variablesGlobales.langue);
    console.log(browserLang);
    console.log("langue value in display translation comp :",this.variablesGlobales.langue)
  }
  get getlangue()
  {
    console.log("langue value :",this.variablesGlobales.langue)
    
      return this.variablesGlobales.langue;
  }

  ngOnInit(): void {

    this.translationService.findAddressType().subscribe((data)=>{
      this.addressType =data;
      console.log("addressType",this.addressType)

      this.translationService.findSettingAddress().subscribe((data)=>{
        this.settingaddress=data
        console.log("settingaddress",this.settingaddress)
        this.translationService.findAddressList(["1","2","4","8"]).subscribe((data)=>{
          this.addressList=data
          console.log("addressList",this.addressList)

          this.translationService.findAddressListValue({"addressListId": 1}).subscribe((data)=>{
            this.countries=data
            console.log("country",this.countries)

          })
        })

      })
    })



    if(this.variablesGlobales.langue == ''){

    
    console.log("selected langue via service :",this.variablesGlobales.langue)
    this.translationService.get_Values_FromSelectedLang("Nationality","FIELD_NAME","null","null","fr").subscribe((data)=>{
      this.variablesGlobales.nationality=data
      console.log("nationality values :",this.variablesGlobales.nationality)

      this.translationService.get_Values_FromSelectedLang("Family situation","FIELD_NAME","null","null","fr").subscribe((data)=>{
        this.variablesGlobales.familySituation=data
        console.log("family situation values :",this.variablesGlobales.familySituation)


        this.translationService.get_Values_FromSelectedLang("acm_setting_list_values","VALUE_JSON","Branches","name","fr").subscribe((data)=>{
          this.variablesGlobales.branches=data
          console.log("family situation values :",this.variablesGlobales.familySituation)
  
        })

        this.translationService.get_Values_FromSelectedLang("acm_setting_list_values","VALUE_JSON","Relationship","name","fr").subscribe((data)=>{
          this.variablesGlobales.relationship=data
          console.log("family situation values :",this.variablesGlobales.familySituation)
  
        })

      })
    })
  }else{




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

      })
    })



  }

 
  
}

select1(event){
console.log("select 1 changed")
console.log("country",this.countries)
var obj = {"addressListId":2,"parentId":this.countries.addressListValueID}
this.translationService.findAddressListValue(obj).subscribe((data)=>{
  this.regions=data
  console.log("regions",this.regions)


})

}

select2(event){
  console.log("select 2 changed")
  console.log("value de region ",this.region)
  var obj = {"addressListId":4,"parentId":this.region}
  this.translationService.findAddressListValue(obj).subscribe((data)=>{
    this.cities=data
    this.districts=[]
    console.log("cities",this.cities)
  
  
  })


}

select3(event){
  console.log("select 3 changed")
  console.log("value de city ",this.city)

  var obj = {"addressListId":8,"parentId":this.city}
  this.translationService.findAddressListValue(obj).subscribe((data)=>{
    this.districts=data
    console.log("districts",this.districts)
  
  
  })


}

select4(event){
  console.log("select 4 changed")
    console.log("value de district ",this.district)


}

}

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
    if( this.variablesGlobales.langue == ''){
    this.translate.use(browserLang.match(/en|fr|ar/) ? browserLang : 'fr')
    }else{
      this.translate.use(browserLang.match(/en|fr|ar/) ? browserLang : this.variablesGlobales.langue);

    }


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

            this.translationService.readAcmAddressTranslation(this.variablesGlobales.countries,"fr").subscribe((data)=>{
              this.variablesGlobales.country=data
            })
          

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

  if(this.variablesGlobales.langue == ''){

  var values=[]
  this.variablesGlobales.regions=[]
console.log("select 1 changed")
console.log("country",this.countries)
for(var i=0;i<this.variablesGlobales.countries.length;i++){
  var obj = {"addressListId":2,"parentId":this.variablesGlobales.countries[i].addressListValueID}
  this.translationService.findAddressListValue(obj).subscribe((data)=>{
    this.regions=data
    console.log("regions",this.regions)
    for(var i=0;i<this.regions.length;i++){
      
      this.variablesGlobales.regions.push(this.regions[i])
      values.push(this.regions[i].name)

    }

    this.translationService.readAcmAddressTranslation(values,"fr").subscribe((data)=>{
      this.variablesGlobales.region=data
      console.log("data region english :", this.variablesGlobales.region)
      console.log("data regions values :",this.variablesGlobales.regions)

      })
    


  
  
  
  })
}
  }else{

    var values=[]
    this.variablesGlobales.regions=[]
  console.log("select 1 changed")
  console.log("country",this.countries)
  for(var i=0;i<this.variablesGlobales.countries.length;i++){
    var obj = {"addressListId":2,"parentId":this.variablesGlobales.countries[i].addressListValueID}
    this.translationService.findAddressListValue(obj).subscribe((data)=>{
      this.regions=data
      console.log("regions",this.regions)
      for(var i=0;i<this.regions.length;i++){
        
        this.variablesGlobales.regions.push(this.regions[i])
        values.push(this.regions[i].name)
  
      }
  
      this.translationService.readAcmAddressTranslation(values,this.variablesGlobales.langue).subscribe((data)=>{
        this.variablesGlobales.region=data
        console.log("data region english :", this.variablesGlobales.region)
        console.log("data regions values :",this.variablesGlobales.regions)
  
        })
      
  
  
    
    
    
    })
  }




  }


}
objectif :any

values_districts=[]

select2(e){
  this.region=e
  if(this.variablesGlobales.langue == ''){

  var values=[]
  this.variablesGlobales.city=[]
  var values_cities=[]
  console.log("select 2 changed")
  console.log("value de region ",this.region)
  console.log("data region  :", this.variablesGlobales.region)
  console.log("data regions values :",this.variablesGlobales.regions)
  this.translationService.readAcmAddressTranslation([this.region],"fr").subscribe((data)=>{
    console.log("value new region de region ",data)
    if(data.length ==0){

  console.log("data length = 0") 
    this.objectif = this.variablesGlobales.regions.filter(x=>x.name == this.region);
  }
    else {
      console.log("data length > 0") 
      this.objectif = this.variablesGlobales.regions.filter(x=>x.name == data);

    }

   console.log("objectif valueeeee :",this.objectif)
  
    var obj = {"addressListId":4,"parentId":this.objectif[0].addressListValueID}
    console.log("object :",obj)
  this.translationService.findAddressListValue(obj).subscribe((data)=>{
    this.cities=data
    this.variablesGlobales.cities=[]
    console.log("cities",this.cities)
    for(var i=0;i<this.cities.length;i++){
      this.variablesGlobales.cities.push(this.cities[i])
      values.push(this.cities[i].name)

    }
    console.log("valueeeeeeeeeees",values)

    this.translationService.readAcmAddressTranslation(values,"fr").subscribe((data)=>{
      this.variablesGlobales.city=data
      console.log("data city  :", this.variablesGlobales.city + "langue :","fr")
      console.log("data city values :",this.variablesGlobales.cities)
      for(var i=0;i<this.variablesGlobales.cities.length;i++){
        values_cities.push(this.variablesGlobales.cities[i].name)
  
      }
      this.translationService.readAcmAddressTranslation(values_cities,"fr").subscribe((data)=>{
        this.variablesGlobales.city=data
        console.log("variablesGlobales.city length > 0",this.variablesGlobales.city)

        if(this.variablesGlobales.city.length == 0){
          this.variablesGlobales.city = values_cities
          console.log("variablesGlobales.city length = 0",this.variablesGlobales.city)

        }
      })

      })
  
  
  })

})

  }else{


    var values=[]
    this.variablesGlobales.city=[]
    var values_cities=[]
    console.log("select 2 changed")
    console.log("value de region ",this.region)
    console.log("data region  :", this.variablesGlobales.region)
    console.log("data regions values :",this.variablesGlobales.regions)
    this.translationService.readAcmAddressTranslation([this.region],this.variablesGlobales.langue).subscribe((data)=>{
      console.log("value new region de region ",data)

      if(data.length ==0){

        console.log("data length = 0") 
          this.objectif = this.variablesGlobales.regions.filter(x=>x.name == this.region);
        }
          else {
            console.log("data length > 0") 
            this.objectif = this.variablesGlobales.regions.filter(x=>x.name == data);
      
          }


     console.log("objectif valueeeee :",this.objectif)
    
      var obj = {"addressListId":4,"parentId":this.objectif[0].addressListValueID}
      console.log("object :",obj)
    this.translationService.findAddressListValue(obj).subscribe((data)=>{
      this.cities=data
      this.variablesGlobales.cities=[]
      console.log("cities",this.cities)
      for(var i=0;i<this.cities.length;i++){
        this.variablesGlobales.cities.push(this.cities[i])
        values.push(this.cities[i].name)
  
      }
  
      this.translationService.readAcmAddressTranslation(values,this.variablesGlobales.langue).subscribe((data)=>{
        this.variablesGlobales.city=data
        console.log("data city  :", this.variablesGlobales.city + "langue :",this.variablesGlobales.langue)
        console.log("data city values :",this.variablesGlobales.cities)
        for(var i=0;i<this.variablesGlobales.cities.length;i++){
          values_cities.push(this.variablesGlobales.cities[i].name)
    
        }
        console.log(" values cities  :", values_cities )

        this.translationService.readAcmAddressTranslation(values_cities,this.variablesGlobales.langue).subscribe((data)=>{
          if(data.length == 0){
            this.variablesGlobales.city=values_cities

          }else{
            this.variablesGlobales.city=data

          }
          console.log("translation values cities  :", this.variablesGlobales.city )
          console.log("translation values cities length  :", this.variablesGlobales.city.length )

         


        })
  
        })
    
    
    })
  
  })



  }
}

select3(e){
  this.city=e

  if(this.variablesGlobales.langue == ''){

    var values=[]
    this.variablesGlobales.district=[]
    var values_districts=[]
    console.log("select 3 changed")
    console.log("value de city ",this.city)
    console.log("data city  :", this.variablesGlobales.city)
    console.log("data cities values :",this.variablesGlobales.cities)
    this.translationService.readAcmAddressTranslation([this.city],"fr").subscribe((data)=>{
      console.log("value new city de city ",data)
      if(data.length ==0){
  
    console.log("data length = 0") 
      this.objectif = this.variablesGlobales.cities.filter(x=>x.name == this.city);
    }
      else {
        console.log("data length > 0") 
        this.objectif = this.variablesGlobales.cities.filter(x=>x.name == data);
  
      }
  
     console.log("objectif valueeeee :",this.objectif)
    
      var obj = {"addressListId":8,"parentId":this.objectif[0].addressListValueID}
      console.log("object :",obj)
    this.translationService.findAddressListValue(obj).subscribe((data)=>{
      this.districts=data
      this.variablesGlobales.districts=[]
      console.log("districts",this.districts)
      for(var i=0;i<this.districts.length;i++){
        this.variablesGlobales.districts.push(this.districts[i])
        values.push(this.districts[i].name)
  
      }
      console.log("valueeeeeeeeeees",values)
  
      this.translationService.readAcmAddressTranslation(values,"fr").subscribe((data)=>{
        this.variablesGlobales.district=data
        console.log("data district  :", this.variablesGlobales.district + "langue :","fr")
        console.log("data district values :",this.variablesGlobales.districts)
        for(var i=0;i<this.variablesGlobales.districts.length;i++){
          values_districts.push(this.variablesGlobales.districts[i].name)
    
        }
        this.translationService.readAcmAddressTranslation(values_districts,"fr").subscribe((data)=>{
          this.variablesGlobales.district=data
          console.log("variablesGlobales.district length > 0",this.variablesGlobales.district)
  
          if(this.variablesGlobales.district.length == 0){
            this.variablesGlobales.district = values_districts
            console.log("variablesGlobales.district length = 0",this.variablesGlobales.district)
  
          }
        })
  
        })
    
    
    })
  
  })
  
    }else{
  
  
      var values=[]
      this.variablesGlobales.district=[]
      var values_districts=[]
      console.log("select 3 changed")
      console.log("value de city ",this.city)
      console.log("data city  :", this.variablesGlobales.city)
      console.log("data cities values :",this.variablesGlobales.cities)
      this.translationService.readAcmAddressTranslation([this.city],this.variablesGlobales.langue).subscribe((data)=>{
        console.log("value new city de city ",data)

        if(data.length ==0){

          console.log("data length = 0") 
            this.objectif = this.variablesGlobales.cities.filter(x=>x.name == this.city);
          }
            else {
              console.log("data length > 0") 
              this.objectif = this.variablesGlobales.cities.filter(x=>x.name == data);
        
            }

       console.log("objectif valueeeee :",this.objectif)
      
        var obj = {"addressListId":8,"parentId":this.objectif[0].addressListValueID}
        console.log("object :",obj)
      this.translationService.findAddressListValue(obj).subscribe((data)=>{
        this.districts=data
        this.variablesGlobales.districts=[]
        console.log("districts",this.districts)
        for(var i=0;i<this.districts.length;i++){
          this.variablesGlobales.districts.push(this.districts[i])
          values.push(this.districts[i].name)
    
        }
    
        this.translationService.readAcmAddressTranslation(values,this.variablesGlobales.langue).subscribe((data)=>{
          this.variablesGlobales.district=data
          console.log("data district  :", this.variablesGlobales.district + "langue :",this.variablesGlobales.langue)
          console.log("data district values :",this.variablesGlobales.districts)
          for(var i=0;i<this.variablesGlobales.districts.length;i++){
            values_districts.push(this.variablesGlobales.districts[i].name)
      
          }
          console.log("values districts  :", values_districts )
          this.translationService.readAcmAddressTranslation(values_districts,this.variablesGlobales.langue).subscribe((data)=>{
            if(data.length == 0){
              this.variablesGlobales.district=values_districts
  
            }else{
              this.variablesGlobales.district=data
  
            }
           
            console.log("translation values districts  :", this.variablesGlobales.district )
           
  
          })
    
          })
      
      
      })
    
    })
  
  
  
    }


}

select4(e){
  this.district=e
  console.log("select 4 changed")
    console.log("value de district ",this.district)


}

}

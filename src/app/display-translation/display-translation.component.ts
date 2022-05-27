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
    
   
  
}



}

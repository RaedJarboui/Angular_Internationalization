import { Component, Inject,ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, NgForm } from '@angular/forms';
import { TranslationService } from 'src/app/services/translation.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { stringify } from 'querystring';
import { VariablesGlobales } from '../services/VariablesGlobales ';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../services/loading.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-langues',
  templateUrl: './langues.component.html',
  styleUrls: ['./langues.component.css']
})
export class LanguesComponent implements OnInit {
  langues;
  paginated_langues;
  closeResult:string
  searchTerm: string;
  collectionSize: number;
  deleteId:number
  isGlobal:boolean
  heading = 'Bootstrap 5 Tables';
  subheading = 'Tables are the backbone of almost all web applications.';
  icon = 'pe-7s-drawer icon-gradient bg-happy-itmeo';
  currentIndex = -1;
  title = '';
  page = 2;
  rows =0
  count = 0;
  pageSize = 2;
  pageSizes = [1,2, 5, 10];
  currentTutorial = null;
  langue:any;
  langueId:any
  filteredLangue:any
  langueName=''

  myObjArray=[]

  cols = [
    { field: 'locale', header: 'Setting_translate.Code' },
    { field: 'languageName', header: 'Setting_translate.Name' },
    { field: 'global', header: 'Setting_translate.Status' },
    { field: 'Actions', header: 'Setting_translate.Actions' }

];
    languages = [
    { code : 'ab', name : 'Abkhazian' },
    { code : 'aa', name : 'Afar' },
    { code : 'af', name : 'Afrikaans' },
    { code : 'ak', name : 'Akan' },
    { code : 'sq', name : 'Albanian' },
    { code : 'am', name : 'Amharic' },
    { code : 'ar', name : 'Arabic' },
    { code : 'an', name : 'Aragonese' },
    { code : 'hy', name : 'Armenian' },
    { code : 'as', name : 'Assamese' },
    { code : 'av', name : 'Avaric' },
    { code : 'ae', name : 'Avestan' },
    { code : 'ay', name : 'Aymara' },
    { code : 'az', name : 'Azerbaijani' },
    { code : 'bm', name : 'Bambara' },
    { code : 'ba', name : 'Bashkir' },
    { code : 'eu', name : 'Basque' },
    { code : 'be', name : 'Belarusian' },
    { code : 'bn', name : 'Bengali' },
    { code : 'bh', name : 'Bihari languages' },
    { code : 'bi', name : 'Bislama' },
    { code : 'bs', name : 'Bosnian' },
    { code : 'br', name : 'Breton' },
    { code : 'bg', name : 'Bulgarian' },
    { code : 'my', name : 'Burmese' },
    { code : 'ca', name : 'Catalan, Valencian' },
    { code : 'km', name : 'Central Khmer' },
    { code : 'ch', name : 'Chamorro' },
    { code : 'ce', name : 'Chechen' },
    { code : 'ny', name : 'Chichewa, Chewa, Nyanja' },
    { code : 'zh', name : 'Chinese' },
    { code : 'cu', name : 'Church Slavonic, Old Bulgarian, Old Church Slavonic' },
    { code : 'cv', name : 'Chuvash' },
    { code : 'kw', name : 'Cornish' },
    { code : 'co', name : 'Corsican' },
    { code : 'cr', name : 'Cree' },
    { code : 'hr', name : 'Croatian' },
    { code : 'cs', name : 'Czech' },
    { code : 'da', name : 'Danish' },
    { code : 'dv', name : 'Divehi, Dhivehi, Maldivian' },
    { code : 'nl', name : 'Dutch, Flemish' },
    { code : 'dz', name : 'Dzongkha' },
    { code : 'en', name : 'English' },
    { code : 'eo', name : 'Esperanto' },
    { code : 'et', name : 'Estonian' },
    { code : 'ee', name : 'Ewe' },
    { code : 'fo', name : 'Faroese' },
    { code : 'fj', name : 'Fijian' },
    { code : 'fi', name : 'Finnish' },
    { code : 'fr', name : 'French' },
    { code : 'ff', name : 'Fulah' },
    { code : 'gd', name : 'Gaelic, Scottish Gaelic' },
    { code : 'gl', name : 'Galician' },
    { code : 'lg', name : 'Ganda' },
    { code : 'ka', name : 'Georgian' },
    { code : 'de', name : 'German' },
    { code : 'ki', name : 'Gikuyu, Kikuyu' },
    { code : 'el', name : 'Greek (Modern)' },
    { code : 'kl', name : 'Greenlandic, Kalaallisut' },
    { code : 'gn', name : 'Guarani' },
    { code : 'gu', name : 'Gujarati' },
    { code : 'ht', name : 'Haitian, Haitian Creole' },
    { code : 'ha', name : 'Hausa' },
    { code : 'he', name : 'Hebrew' },
    { code : 'hz', name : 'Herero' },
    { code : 'hi', name : 'Hindi' },
    { code : 'ho', name : 'Hiri Motu' },
    { code : 'hu', name : 'Hungarian' },
    { code : 'is', name : 'Icelandic' },
    { code : 'io', name : 'Ido' },
    { code : 'ig', name : 'Igbo' },
    { code : 'id', name : 'Indonesian' },
    { code : 'ia', name : 'Interlingua (International Auxiliary Language Association)' },
    { code : 'ie', name : 'Interlingue' },
    { code : 'iu', name : 'Inuktitut' },
    { code : 'ik', name : 'Inupiaq' },
    { code : 'ga', name : 'Irish' },
    { code : 'it', name : 'Italian' },
    { code : 'ja', name : 'Japanese' },
    { code : 'jv', name : 'Javanese' },
    { code : 'kn', name : 'Kannada' },
    { code : 'kr', name : 'Kanuri' },
    { code : 'ks', name : 'Kashmiri' },
    { code : 'kk', name : 'Kazakh' },
    { code : 'rw', name : 'Kinyarwanda' },
    { code : 'kv', name : 'Komi' },
    { code : 'kg', name : 'Kongo' },
    { code : 'ko', name : 'Korean' },
    { code : 'kj', name : 'Kwanyama, Kuanyama' },
    { code : 'ku', name : 'Kurdish' },
    { code : 'ky', name : 'Kyrgyz' },
    { code : 'lo', name : 'Lao' },
    { code : 'la', name : 'Latin' },
    { code : 'lv', name : 'Latvian' },
    { code : 'lb', name : 'Letzeburgesch, Luxembourgish' },
    { code : 'li', name : 'Limburgish, Limburgan, Limburger' },
    { code : 'ln', name : 'Lingala' },
    { code : 'lt', name : 'Lithuanian' },
    { code : 'lu', name : 'Luba-Katanga' },
    { code : 'mk', name : 'Macedonian' },
    { code : 'mg', name : 'Malagasy' },
    { code : 'ms', name : 'Malay' },
    { code : 'ml', name : 'Malayalam' },
    { code : 'mt', name : 'Maltese' },
    { code : 'gv', name : 'Manx' },
    { code : 'mi', name : 'Maori' },
    { code : 'mr', name : 'Marathi' },
    { code : 'mh', name : 'Marshallese' },
    { code : 'ro', name : 'Moldovan, Moldavian, Romanian' },
    { code : 'mn', name : 'Mongolian' },
    { code : 'na', name : 'Nauru' },
    { code : 'nv', name : 'Navajo, Navaho' },
    { code : 'nd', name : 'Northern Ndebele' },
    { code : 'ng', name : 'Ndonga' },
    { code : 'ne', name : 'Nepali' },
    { code : 'se', name : 'Northern Sami' },
    { code : 'no', name : 'Norwegian' },
    { code : 'nb', name : 'Norwegian Bokmål' },
    { code : 'nn', name : 'Norwegian Nynorsk' },
    { code : 'ii', name : 'Nuosu, Sichuan Yi' },
    { code : 'oc', name : 'Occitan (post 1500)' },
    { code : 'oj', name : 'Ojibwa' },
    { code : 'or', name : 'Oriya' },
    { code : 'om', name : 'Oromo' },
    { code : 'os', name : 'Ossetian, Ossetic' },
    { code : 'pi', name : 'Pali' },
    { code : 'pa', name : 'Panjabi, Punjabi' },
    { code : 'ps', name : 'Pashto, Pushto' },
    { code : 'fa', name : 'Persian' },
    { code : 'pl', name : 'Polish' },
    { code : 'pt', name : 'Portuguese' },
    { code : 'qu', name : 'Quechua' },
    { code : 'rm', name : 'Romansh' },
    { code : 'rn', name : 'Rundi' },
    { code : 'ru', name : 'Russian' },
    { code : 'sm', name : 'Samoan' },
    { code : 'sg', name : 'Sango' },
    { code : 'sa', name : 'Sanskrit' },
    { code : 'sc', name : 'Sardinian' },
    { code : 'sr', name : 'Serbian' },
    { code : 'sn', name : 'Shona' },
    { code : 'sd', name : 'Sindhi' },
    { code : 'si', name : 'Sinhala, Sinhalese' },
    { code : 'sk', name : 'Slovak' },
    { code : 'sl', name : 'Slovenian' },
    { code : 'so', name : 'Somali' },
    { code : 'st', name : 'Sotho, Southern' },
    { code : 'nr', name : 'South Ndebele' },
    { code : 'es', name : 'Spanish, Castilian' },
    { code : 'su', name : 'Sundanese' },
    { code : 'sw', name : 'Swahili' },
    { code : 'ss', name : 'Swati' },
    { code : 'sv', name : 'Swedish' },
    { code : 'tl', name : 'Tagalog' },
    { code : 'ty', name : 'Tahitian' },
    { code : 'tg', name : 'Tajik' },
    { code : 'ta', name : 'Tamil' },
    { code : 'tt', name : 'Tatar' },
    { code : 'te', name : 'Telugu' },
    { code : 'th', name : 'Thai' },
    { code : 'bo', name : 'Tibetan' },
    { code : 'ti', name : 'Tigrinya' },
    { code : 'to', name : 'Tonga (Tonga Islands)' },
    { code : 'ts', name : 'Tsonga' },
    { code : 'tn', name : 'Tswana' },
    { code : 'tr', name : 'Turkish' },
    { code : 'tk', name : 'Turkmen' },
    { code : 'tw', name : 'Twi' },
    { code : 'ug', name : 'Uighur, Uyghur' },
    { code : 'uk', name : 'Ukrainian' },
    { code : 'ur', name : 'Urdu' },
    { code : 'uz', name : 'Uzbek' },
    { code : 've', name : 'Venda' },
    { code : 'vi', name : 'Vietnamese' },
    { code : 'vo', name : 'Volap_k' },
    { code : 'wa', name : 'Walloon' },
    { code : 'cy', name : 'Welsh' },
    { code : 'fy', name : 'Western Frisian' },
    { code : 'wo', name : 'Wolof' },
    { code : 'xh', name : 'Xhosa' },
    { code : 'yi', name : 'Yiddish' },
    { code : 'yo', name : 'Yoruba' },
    { code : 'za', name : 'Zhuang, Chuang' },
    { code : 'zu', name : 'Zulu' }
];
  


  text = ''; //initialised the text variable
  filteredRows: any;
  allRows: any;
  sortedField: any;
  order: any;
  filterField: string;
  loading = true;

  constructor(public translate: TranslateService,public translationService:TranslationService,public dataDialogHandler: MatDialog,private modalService: NgbModal,
    private toast: ToastrService,public variablesGlobales: VariablesGlobales , private _loading: LoadingService
    ) {

      this.translate.addLangs(['en', 'fr','ar']);
      this.translate.setDefaultLang('en');
  
      const browserLang = this.variablesGlobales.langue
      this.translate.use(browserLang.match(/en|fr|ar/) ? browserLang : browserLang);
  
      console.log(browserLang);
      console.log("langue value in langue comp :",this.variablesGlobales.langue)
   }

   value:string
   @ViewChild('dt') dataTable: Table;
 

  ngOnInit(): void {
    
  }
 
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  
  getRequestParams(page, size) {
    let params = {};

    if (page) {
      params[`page`] = page -1 ;
    }

    if (size) {
      params[`size`] = size;
    }

    return params;
  }
  e:any
  
  handlePageChange(event) {
    this.e=event
    console.log("event :", event)
    let currentPage = event.first / event.rows + 1;
    console.log('currentPage = ' + currentPage);
    const isEmpty = Object.keys(event.filters).length === 0;
if(event.multiSortMeta && isEmpty){
  
  console.log("yes sorting and no filter")
  this.loading = true;

    let object = {"pageNumber":currentPage-1,"pageSize":event.rows,"sortDirection":event.multiSortMeta[0].order.toString(),"sortField": event.multiSortMeta[0].field}
    this.translationService.getSortedLangues(object).subscribe((data)=>{
      console.log("SortedLangues :",data)
      this.langues=data.languages;
      this.count = data.totalElements
      this.pageSize=data.pageSize
      if(data)
      this.loading = false;


      // this._loading.loadingSub
      // .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      // .subscribe(() => {
      //   console.log("loading :",this.loading)
      // });
  

      

    })
  }else if(!event.multiSortMeta && isEmpty){
    console.log("no sorting and no filter")
    this.loading = true;

    let object1 = {"pageNumber":currentPage-1,"pageSize":event.rows,"sortDirection":"1","sortField": "locale"}
    this.translationService.getSortedLangues(object1).subscribe((data)=>{
      console.log("SortedLangues :",data)
      this.langues=data.languages;
      this.count = data.totalElements
      this.pageSize=data.pageSize
      if(data)
      this.loading = false;


      // this._loading.loadingSub
      // .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      // .subscribe((loading) => {
      //   this.loading = loading;
      // });

    })

  }else if(!isEmpty && !event.multiSortMeta){
    console.log("yes filter and no sort")
    this.loading = true;
    console.log("filter :", event.filters)
    var keys = Object.keys(event.filters)
    console.log("keys :",keys[0])
     this.filterField = keys[0]
     console.log("filter fielterfield:", event.filters[this.filterField].value)
     var obj = {};
     obj[this.filterField] = event.filters[this.filterField].value;
     console.log(obj)
  
     let object = {"pageNumber":currentPage-1,"pageSize":event.rows,"params":obj}
     this.translationService.getSortedLangues(object).subscribe((data)=>{
       console.log("SortedLangues :",data)
       this.langues=data.languages;
       this.count = data.totalElements
       this.pageSize=data.pageSize
       if(data)
      this.loading = false;

      
  
     })

  }else if(!isEmpty && event.multiSortMeta){
    console.log("yes sorting and yes filter")
    this.loading = true;
    console.log("filter :", event.filters)
    var keys = Object.keys(event.filters)
    console.log("keys :",keys[0])
     this.filterField = keys[0]
     console.log("filter fielterfield:", event.filters[this.filterField].value)
     var obj = {};
     obj[this.filterField] = event.filters[this.filterField].value;
     console.log(obj)
    let object = {"pageNumber":currentPage-1,"pageSize":event.rows,"sortDirection":event.multiSortMeta[0].order.toString(),"sortField": event.multiSortMeta[0].field,"params":obj}
    this.translationService.getSortedLangues(object).subscribe((data)=>{
      console.log("SortedLangues :",data)
      this.langues=data.languages;
      this.count = data.totalElements
      this.pageSize=data.pageSize
      if(data)
      this.loading = false;

    })
  }


  }

  sortByType(langues): void {
    console.log(this.sortedField)
    langues.sort(function(a, b) {
      console.log(a)
      console.log(b.locale)

      return a[this.sortedField] - b[this.sortedField];
    });
this.langues = langues 
console.log("this sorted langues :",this.langues)
 }


  columnFilter(event: any, field) {
    this.dataTable.filter(event.target.value, field, 'contains');
  }
  
  toggleVisibility(event,id){
   
    console.log(event.target.checked);
    console.log(id)
  

}
select(value){
  console.log(value)
   this.filteredLangue=this.languages.filter(element => element.code == value);
  console.log(this.filteredLangue)
  this.langueName=this.filteredLangue[0].name
  console.log(this.langueName)


}
  search(value: string): void {
    this.langues = this.langues.filter((val) => val.locale.toLowerCase().includes(value) || val.languageName.toLowerCase().includes(value));
    this.collectionSize = this.langues.length;
  }
  addLanguage(){
    console.log("hi");
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEdit(content,id) {
    this.translationService.findLangueById(id).subscribe((data)=>{
      this.langue=data
      this.langueId = this.langue.id
      console.log(this.langue)
      
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

   

    })
   
  }
  openDelete(targetModal,langue) {
     this.deleteId = langue.id;
     console.log(this.deleteId)
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  onDelete() {

    this.translationService.deleteLangue(this.deleteId)
      .subscribe((results) => {
        this.handlePageChange(this.e)
        this.modalService.dismissAll();
        this.toast.success("I'm a toast!", "language deleted succesfully!");
    

      },
      error => {
        console.log(error)
        this.toast.error("I'm a toast!", "language not deleted succesfully!");

      },);
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  onSubmit(f: NgForm) {
    console.log(f.value)

    this.translationService.addLangue(f.value).subscribe((data)=>{
      this.handlePageChange(this.e)
      console.log(f.value)
      this.modalService.dismissAll();
      this.toast.success("I'm a toast!", "language added succesfully!");
    
    },
    error=>{
      console.log(error)
      this.toast.success("I'm a toast!", "language not added succesfully!");

    })
  }

  onSubmitEdit(f: NgForm) {
    console.log(f.value)
    console.log(this.langueId)
    this.translationService.editLangue(this.langueId,f.value).subscribe((data)=>{
      this.handlePageChange(this.e)
      console.log(f.value)
      this.modalService.dismissAll();
      this.toast.success("I'm a toast!", "language edited succesfully!");
     

    },error=>{
      console.log(error)
      this.toast.error("I'm a toast!", "language not edited succesfully!");
    })
  }

}



export interface DialogData {
  example: string;
}










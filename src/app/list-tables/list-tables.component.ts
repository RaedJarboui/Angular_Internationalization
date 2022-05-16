import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation.service';
import { VariablesGlobales } from '../services/VariablesGlobales ';

@Component({
  selector: 'app-list-tables',
  templateUrl: './list-tables.component.html',
  styleUrls: ['./list-tables.component.css']
})
export class ListTablesComponent implements OnInit {
  tables;
  selectedIds = [];
  tables_list;
  equal:boolean
  heading = 'Bootstrap 5 Tables';
  subheading = 'Tables are the backbone of almost all web applications.';
  icon = 'pe-7s-drawer icon-gradient bg-happy-itmeo';

  title = '';
  page = 1;
  count = 0;
  pageSize = 2;
  pageSizes = [1,2, 5, 10];
  tab_list:any

  cols = [
    { field: 'tableName', header: 'TableName' },
    { field: 'translate', header: 'Translate' },
    { field: 'View Table details', header: 'View Table details' },

];

  constructor(public translate: TranslateService,private translationService : TranslationService,private router: Router,public variablesGlobales: VariablesGlobales) {
    this.translate.addLangs(['en', 'fr','ar']);
    this.translate.setDefaultLang('en');

    const browserLang = this.variablesGlobales.langue
    this.translate.use(browserLang.match(/en|fr|ar/) ? browserLang : 'en');

    console.log(browserLang);
    console.log("langue value in list tables comp :",this.variablesGlobales.langue)
   }

  ngOnInit(): void {
   
    
  }

  getRequestParams(page, size) {
    let params = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (size) {
      params[`size`] = size;
    }

    return params;
  }
  e:any
  filterField: string;


  
  handlePageChange(event) {
    this.e=event
    console.log("event :", event)

    let currentPage = event.first / event.rows + 1;
    console.log('currentPage = ' + currentPage);
    const isEmpty = Object.keys(event.filters).length === 0;
    if(event.multiSortMeta && isEmpty){
      console.log("yes sorting and no filter")
        let object = {"pageNumber":currentPage-1,"pageSize":event.rows,"sortDirection":event.multiSortMeta[0].order.toString(),"sortField": event.multiSortMeta[0].field}
        this.translationService.getSortedListTab(object).subscribe((data)=>{
          console.log("SortedLangues :",data)
          this.tab_list=data.tab_list;
          this.count = data.totalElements
          this.pageSize=data.pageSize
    
        })
      }else if(!event.multiSortMeta && isEmpty){
        console.log("no sorting and no filter")
        let object1 = {"pageNumber":currentPage-1,"pageSize":event.rows,"sortDirection":"1","sortField": "tableName"}
        this.translationService.getSortedListTab(object1).subscribe((data)=>{
          console.log("SortedLangues :",data)
          this.tab_list=data.tab_list;
          this.count = data.totalElements
          this.pageSize=data.pageSize
    
        })
    
      }else if(!isEmpty && !event.multiSortMeta){
        console.log("yes filter and no sort")
        console.log("filter :", event.filters)
        var keys = Object.keys(event.filters)
        console.log("keys :",keys[0])
         this.filterField = keys[0]
         console.log("filter fielterfield:", event.filters[this.filterField].value)
      
       
         var obj = {};
      
         obj[this.filterField] = event.filters[this.filterField].value;
         console.log(obj)
      
         let object = {"pageNumber":currentPage-1,"pageSize":event.rows,"params":obj}
         this.translationService.getSortedListTab(object).subscribe((data)=>{
           console.log("SortedLangues :",data)
           this.tab_list=data.tab_list;
           this.count = data.totalElements
           this.pageSize=data.pageSize
      
         })
    
    
    
      }else if(!isEmpty && event.multiSortMeta){
        console.log("yes sorting and yes filter")
    
        console.log("filter :", event.filters)
        var keys = Object.keys(event.filters)
        console.log("keys :",keys[0])
         this.filterField = keys[0]
         console.log("filter fielterfield:", event.filters[this.filterField].value)
         var obj = {};
         obj[this.filterField] = event.filters[this.filterField].value;
         console.log(obj)
    
    
    
        let object = {"pageNumber":currentPage-1,"pageSize":event.rows,"sortDirection":event.multiSortMeta[0].order.toString(),"sortField": event.multiSortMeta[0].field,"params":obj}
        this.translationService.getSortedListTab(object).subscribe((data)=>{
          console.log("SortedLangues :",data)
          this.tab_list=data.tab_list;
          this.count = data.totalElements
          this.pageSize=data.pageSize
    
        })
      }




  }
  


  details(i){
console.log(i);
console.log(this.tab_list)
let tab =  this.tab_list.find(t=>t.id ===i);
this.router.navigate(['tabscolumns',tab.tableName])
  }

  checkArrays( arrA, arrB ){

    //check if lengths are different
    if(arrA.length !== arrB.length) return false;

    //slice so we do not effect the orginal
    //sort makes sure they are in order
    var cA = arrA.slice().sort(); 
    var cB = arrB.slice().sort();

    for(var i=0;i<cA.length;i++){
         if(cA[i]!==cB[i]) return false;
    }

    return true;

}
  save(){
    console.log("hi")
    console.log(this.tables.length)
    for(var i=0;i<this.tables.length;i++){
      console.log(this.tables[i])
      var obj1 = { a: this.tables[i] };
      var obj2 = { b: false };
      var merged = Object.assign(obj1, obj2);
      if(!this.selectedIds.find(o=>o.tableName === this.tables[i])){
        this.selectedIds.push({tableName:this.tables[i],translate:false});

      }

    }
    console.log(this.selectedIds)
    this.translationService.addTableList(this.selectedIds).subscribe((data)=>{
      console.log(data)
    })

    console.log(merged);

  }
  toggleVisibility(index,event){
   
    console.log(event.target.checked);
    console.log(index)
    console.log(this.tab_list[index])
    const id = this.tab_list[index].id
    console.log(id)
    this.translationService.editListTables(id,this.tab_list[index]).subscribe((data)=>{
      console.log(data);
      this.handlePageChange(event)
    })
  }
  
}



import { Component, OnInit, ViewEncapsulation,ChangeDetectorRef,DoCheck, KeyValueDiffers, KeyValueDiffer, ElementRef, ViewChild, ViewChildren  } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { TranslationService } from '../services/translation.service';
import * as $ from 'jquery';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import Keyboard from "simple-keyboard";
import KeyboardLayouts from "simple-keyboard-layouts";
import { decodedTextSpanIntersectsWith } from 'typescript';
import { ToastrService } from 'ngx-toastr';
import { VariablesGlobales } from '../services/VariablesGlobales ';



@Component({
  selector: 'app-tables-columns-data',
  encapsulation: ViewEncapsulation.None ,
  templateUrl: './tables-columns-data.component.html',
  styleUrls: [
    "../../../node_modules/simple-keyboard/build/css/index.css",
    './tables-columns-data.component.css'],
})

export class TablesColumnsDataComponent implements OnInit {
  heading = 'Bootstrap 5 Tables';
  subheading = 'Tables are the backbone of almost all web applications.';
  icon = 'pe-7s-drawer icon-gradient bg-happy-itmeo';
  selected_table: string;
  selected_column: string;
  selected_tab: string;
  selected_col: string; //html
  IsJson;
  list_columns;
  tables;
  column_index: number;
  array_json = [];
  array_string = [];
  global_langues = [];
  langues;
  abacus_json_array = [];
  //count: number;
  dp;
  abacus_name_column_index: number;
  c = 3;
  bool: Boolean = false;
  boolValue: Boolean;
  ACM_ADDRESS_SETTING = [];
  columns = [];
  last_array :any;
  select_array :any;
  select2_array = [];
  array_translation_values;
  container: any[] = [1];
  newArray: any = [{ key: 1, values: '' }];
  isActiveData=[]
  values = [];
  db_data = [];
  db1_data = [];
  db_data_json = [];
  db1_data_json = [];
  missing: any[];
  missing_lang =[];
  add_edit: Boolean = false;
  input_num: Boolean = false;
  array_is_empty:Boolean =false
  values_null=[]
  missing_language;
  closeResult:string
  tables_columns;
  col =[]
  value_json:Boolean
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 2;
  pageSizes = [1, 2,5, 10];
  currentTutorial = null;
  filteredTranslation:Observable<any>;


  value = "";
  keyboard: Keyboard;
  keyboardLayouts: any;
  layouts: Array<object>;
  layoutsObj: object;
  selectedLayout: string = "english";
  selectedInput:any;
  columns_exists :Boolean =false
  select2_array_exists :Boolean =false
  page_change_paginate :Boolean 
  cols=[]
  ArrayString: any[];
  tab: any[];
  ascending: any[];
  descending: any;
  ArrayString1: any;
  loading = true;
  jsonArray: any;


  constructor(
    private translationService: TranslationService,
    private route: ActivatedRoute,
    private eventService: EventService,
    private modalService: NgbModal,
    public dataDialogHandler: MatDialog,
    private toast: ToastrService,
    public router:Router,
    public variablesGlobales:VariablesGlobales
  ) {

    this.keyboardLayouts = new KeyboardLayouts();

    this.layoutsObj = this.keyboardLayouts.get();
    this.layouts = Object.keys(this.layoutsObj).map(layoutName => ({
      name: layoutName,
      value: this.layoutsObj[layoutName]
    }));


  }
  

  ngOnInit(): void {   
    this.array_string=[]
    this.db_data=[]
    this.cols =[]
    this.selected_table = this.route.snapshot.params['name'];
    this.selected_column = this.route.snapshot.params['col'];
    this.IsJson = this.route.snapshot.params['json'];
    this.boolValue = this.getBoolean(this.IsJson); 
    //console.log(this.boolValue);
    //console.log(this.selected_table);
    //console.log(this.selected_column);
    //console.log(this.IsJson);
    this.translationService.getLangues().subscribe((data) => {
      this.langues = data;
      for (var i = 0; i < this.langues.length; i++) {
        if (this.langues[i].global == true) {
          this.count++;
          this.global_langues.push(this.langues[i]);
        }
      }
      //console.log("count :",this.count);
      //console.log(this.langues);
      //console.log(this.global_langues);
      //console.log("trueeeeeeeee")
      this.eventService
        .getListColumns(this.selected_table)
        .subscribe((data) => {
          this.list_columns = data;
          console.log(this.list_columns);
          this.retrieveTranslation();
        })

    });  
  }
  public trackItem (index, item) {
    console.log("index : ",index)
    this.index=index
    console.log("item :",item)
    return item;
  }
  
  getRequestParams(page, size) {
    let params = {};

    if (page) {
      params[`page`] = page;
    }

    if (size) {
      params[`size`] = size;
    }

    return params;
  }
    index :any


  
  retrieveTranslation() {

    for(var i=0;i<this.global_langues.length;i++){
      this.col.push(
        { field: 'fieldValue', header: 'Column value' },  
        { field: this.global_langues[i].locale, header: this.global_langues[i].locale },
        { field: 'Actions', header: 'Actions' }
    
      );
    }

  
    const arr1 = this.getUniqueListBy(this.col, 'field')

    this.col=arr1
    let index = this.col.findIndex(item => item.field == 'Actions')
    console.log("index : ",index)
    this.col.push(this.col.splice(index, 1)[0]);
    console.log("cols : ",this.col)


    const params = this.getRequestParams(1, this.pageSize);
    console.log(params)
    if(this.boolValue == false){
      this.loading = true;
      console.log("trueeeeeeeee")
      this.translationService.nameTypeColumnData(this.selected_table,this.selected_column,this.IsJson,params).subscribe((data)=>{
        console.log(data);
         this.array_string = data.arrayString;
         this.ArrayString = data.ArrayString
         this.db_data = data.db_data
         this.db1_data = data.db1_data
         this.missing = data.missing
         this.missing_lang= data.missing_lang
         this.count = data.count
         this.jsonArray=data.jsonArray
         if(data)
          this.loading = false;
         console.log("array_string",this.array_string)
         console.log("ArrayString",this.ArrayString)
        console.log("db_data",this.db_data)
        console.log("db1_data",this.db1_data)
        console.log("missing",this.missing)
        console.log("missing_lang",this.missing_lang)
        console.log("count",this.count)
        const expected = new Set();
        this.missing_lang = this.missing_lang.filter(item => !expected.has(JSON.stringify(item)) ? expected.add(JSON.stringify(item)) : false);
        console.log("unique values :",this.missing_lang)
        if(data)
          this.loading = false;
  
      },err=>{
        console.log(err)
      })
    }else{
      console.log("falseeeeeeeeeeeee")
      this.loading = false;

      this.translationService.nameTypeColumnDatajson(this.selected_table,this.selected_column,this.IsJson).subscribe((data)=>{

        console.log(data)
        this.last_array = data
        console.log("last_array",this.last_array)
        this.eventService.getTableData(this.selected_table).subscribe((data) => {
          this.tables = data;

        })

      })
    }
    
  }

  e:any
  filterField:any
  currentPage:any

  handlePageChange(event) {

    const list = ['apple', 'banana', 'orange', 'strawberry']
    const items = list.slice(2, 4)
    console.log("items : ",items)
    this.e=event
    console.log("event :", event)
    let currentPage = event.first / event.rows + 1;
    this.currentPage=currentPage
    console.log('currentPage = ' + currentPage);
    const isEmpty = Object.keys(event.filters).length === 0;
    if(event.multiSortMeta && isEmpty){
    console.log("yes sorting and no filter")
    this.loading = true;
    let object = {"pageNumber":currentPage-1,"pageSize":event.rows,"sortDirection":event.multiSortMeta[0].order.toString(),"sortField": event.multiSortMeta[0].field}
    this.translationService.getSortedTranslation(object).subscribe((data)=>{
      console.log("getSortedTranslation :",data)
      if(data)
      this.loading = false;
      this.pageSize=data.pageSize
      this.tab=[]

      if(data.sortDirection == -1){
        this.descending= this.ArrayString.sort((a,b) => (a > b ? -1 : 1))
        console.log("descending",this.descending)
        this.array_string=[]
        for(var i=0 ; i<this.pageSize;i++){
          this.array_string.push(this.descending[i])
          this.tab.push(this.descending[i])

        }
        console.log("tab descending",this.tab)



      }else if (data.sortDirection == 1){
        this.ascending= this.ArrayString.sort((a,b) =>  (a > b ? 1 : -1))
        console.log("ascending",this.ascending)
        this.array_string=[]
        for(var i=0 ; i<this.pageSize;i++){
          this.array_string.push(this.ascending[i])
          this.tab.push(this.ascending[i])

        }
        console.log("tab ascending",this.tab)

      }
     

      const params = this.getRequestParams(currentPage, event.rows);
      this.loading = true;

      this.translationService.nameTypeColumnData(this.selected_table,this.selected_column,this.IsJson,params).subscribe((data)=>{
        if(data)
          this.loading = false;    
        this.array_string = data.arrayString;
           console.log("array_string namecoltype",this.array_string)
           console.log(this.ascending)
           console.log("currentPage",currentPage)
           console.log("pageSize",this.pageSize)
           console.log("ascending slice :",this.ascending.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize))
           if (this.ascending.length>0){
            this.array_string=this.ascending.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize)

           }else if(this.descending.length>0){
            this.array_string=this.descending.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize)
           }
      })
     
    

    })





  }else if(!event.multiSortMeta && isEmpty){
    console.log("no sort and no filter")
    this.loading = true;
      const params = this.getRequestParams(currentPage, event.rows);
      let object1 = {"pageNumber":currentPage-1,"pageSize":event.rows,"sortDirection":"1","sortField": "fieldValue"}
      this.translationService.getSortedTranslation(object1).subscribe((data)=>{
       console.log("getSortedTranslation :",data)
       this.pageSize=data.pageSize
       this.translationService.nameTypeColumnData(this.selected_table,this.selected_column,this.IsJson,params).subscribe((data)=>{
        console.log(data);
        if(data)
        this.loading = false;
         this.array_string = data.arrayString;
         this.count =data.count

          console.log("array string",this.array_string )

   })

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
     this.translationService.getSortedTranslation(object).subscribe((data)=>{
       console.log("getSortedTranslation :",data)
       this.array_string=[]
       for(var i=0;i<data.translations.length;i++){
        this.array_string.push(data.translations[i].fieldValue);
      }
       this.pageSize=data.pageSize
       console.log("array string",this.array_string )
       console.log("Arraaaaay string",this.ArrayString )
       console.log("value of found contains : ",this.ArrayString.filter(v => v.includes(event.filters[this.filterField].value)))
       const result = this.ArrayString.filter(v => v.includes(event.filters[this.filterField].value))

       if (this.array_string.length == 0 && this.ArrayString.filter(v => v.includes(event.filters[this.filterField].value))){
        for(var i=0;i<result.length;i++){
          this.array_string.push(result[i])
        }
        console.log("array string true found : ", this.array_string)
        this.count=this.array_string.length
        if(data.sortDirection == -1){
          this.descending= this.array_string.sort((a,b) => (a > b ? -1 : 1))
          console.log("descending",this.descending)
        }else if(data.sortDirection == -1){
          this.ascending= this.array_string.sort((a,b) => (a > b ? 1 : -1))
          console.log("ascending",this.ascending)
        }
      

      }else {
        console.log("not found ")
        console.log("ArrayString",this.ArrayString)
        
      } 


  
     })

  }else if(!isEmpty && event.multiSortMeta){
    console.log("yes sorting and yes filter")
    this.loading = true;
    let object = {"pageNumber":currentPage-1,"pageSize":event.rows,"sortDirection":event.multiSortMeta[0].order.toString(),"sortField": event.multiSortMeta[0].field}
    this.translationService.getSortedTranslation(object).subscribe((data)=>{
      console.log("getSortedTranslation :",data)
      this.pageSize=data.pageSize
      this.tab=[]
      if(data.sortDirection == -1){
        this.descending= this.ArrayString.sort((a,b) => (a > b ? -1 : 1))
        console.log("descending",this.descending)
        this.array_string=[]
        for(var i=0 ; i<this.pageSize;i++){
          this.array_string.push(this.descending[i])
          this.tab.push(this.descending[i])

        }
        console.log("tab descending",this.tab)

      }else if (data.sortDirection == 1){
        this.ascending= this.ArrayString.sort((a,b) =>  (a > b ? 1 : -1))
        console.log("ascending",this.ascending)
        this.array_string=[]
        for(var i=0 ; i<this.pageSize;i++){
          this.array_string.push(this.ascending[i])
          this.tab.push(this.ascending[i])

        }
        console.log("tab ascending",this.tab)

      }
     
      const params = this.getRequestParams(currentPage, event.rows);
      this.translationService.nameTypeColumnData(this.selected_table,this.selected_column,this.IsJson,params).subscribe((data)=>{
           this.array_string = data.arrayString;
           console.log("array_string namecoltype",this.array_string)
           console.log(this.ascending)
           console.log("currentPage",currentPage)
           console.log("pageSize",this.pageSize)
           console.log("ascending slice :",this.ascending.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize))
           if (this.ascending.length>0){
            this.array_string=this.ascending.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize)
            console.log("filter :", event.filters)
            var keys = Object.keys(event.filters)
            console.log("keys :",keys[0])
             this.filterField = keys[0]
             console.log("filter fielterfield:", event.filters[this.filterField].value)
             var obj = {};
             obj[this.filterField] = event.filters[this.filterField].value;
             console.log(obj)
     this.translationService.getSortedTranslation(object).subscribe((data)=>{
      console.log("getSortedTranslation :",data)
      this.pageSize=data.pageSize
      console.log("array string",this.array_string )
      console.log("Arraaaaay string",this.ArrayString )
      console.log("value of found contains : ",this.ArrayString.filter(v => v.includes(event.filters[this.filterField].value)))
      const result = this.ArrayString.filter(v => v.includes(event.filters[this.filterField].value))
      if (this.ArrayString.filter(v => v.includes(event.filters[this.filterField].value))){
        
        this.array_string=[]
       for(var i=0;i<result.length;i++){
         this.array_string.push(result[i])
       }
       this.array_string=this.array_string.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize)
        console.log("array string true found : ", this.array_string)
        if(this.array_string.length>0)
      this.loading = false;


      }
    })             
             
           }
          //  else if(this.descending.length>0){
          //   this.array_string=this.descending.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize)
          //  }
      })
     
    

    })


  }

     }




     handlePageChangee(event) {
      this.e=event
      console.log("event :", event)
      let currentPage = event.first / event.rows + 1;
      console.log('currentPage = ' + currentPage);
      const isEmpty = Object.keys(event.filters).length === 0;
      if(event.multiSortMeta && isEmpty){
      console.log("yes sorting and no filter table json")
      this.loading = true;
    let object = {"pageNumber":currentPage-1,"pageSize":event.rows,"sortDirection":event.multiSortMeta[0].order.toString(),"sortField": event.multiSortMeta[0].field}
    this.translationService.getSortedTranslation(object).subscribe((data)=>{
      console.log("getSortedTranslation :",data)
      this.pageSize=data.pageSize
      this.tab=[]

      if(data.sortDirection == -1){
        this.descending= this.ArrayString1.sort((a,b) => (a > b ? -1 : 1))
        console.log("descending",this.descending)
        this.select2_array=[]
        for(var i=0 ; i<this.pageSize;i++){
          this.select2_array.push(this.descending[i])
          this.tab.push(this.descending[i])

        }
        console.log("tab descending",this.tab)



      }else if (data.sortDirection == 1){
        this.ascending= this.ArrayString1.sort((a,b) =>  (a > b ? 1 : -1))
        console.log("ascending",this.ascending)
        this.select2_array=[]
        for(var i=0 ; i<this.pageSize;i++){
          this.select2_array.push(this.ascending[i])
          this.tab.push(this.ascending[i])

        }
        console.log("tab ascending",this.tab)

      }
     

      const params = this.getRequestParams(currentPage, event.rows);
      this.translationService.select2(this.selected_table,this.selected_column,this.IsJson,this.columnsdto,params).subscribe((data)=>{
          console.log(data);
        this.select2_array = data.select2_array;   
           console.log("select2_array namecoltype",this.select2_array)
           console.log(this.ascending)
           console.log("currentPage",currentPage)
           console.log("pageSize",this.pageSize)
           console.log("ascending slice :",this.ascending.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize))
           if (this.ascending.length>0){
            this.select2_array=this.ascending.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize)

           }else if(this.descending.length>0){
            this.select2_array=this.descending.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize)
           }
           if(this.select2_array){
            this.loading = false;

           }
      })
     
    

    })


    //No sort no filter json


    }else if(!event.multiSortMeta && isEmpty){
      console.log("no sort and no filter table json")
      this.loading = true;

        const params = this.getRequestParams(currentPage, event.rows);
       
        let object1 = {"pageNumber":currentPage-1,"pageSize":event.rows,"sortDirection":"1","sortField": "fieldValue"}
        this.translationService.getSortedTranslation(object1).subscribe((data)=>{
         console.log("getSortedTranslation table json :",data)
         this.pageSize=data.pageSize


         this.translationService.select2(this.selected_table,this.selected_column,this.IsJson,this.columnsdto,params).subscribe((data)=>{
          console.log(data);
          this.select2_array = data.select2_array;
          this.ArrayString1 = data.ArrayString1
             this.db_data_json = data.db_data_json
             this.db1_data_json = data.db1_data_json
             this.missing = data.missing
             this.missing_lang= data.missing_lang
             this.count=data.count;
             if(this.select2_array){
              this.loading = false;

             }
             console.log("select2_array",this.select2_array)
             console.log("ArrayString1",this.ArrayString1)
             console.log("db_data_json",this.db_data_json)
             console.log("db1_data_json",this.db1_data_json)
             console.log("missing",this.missing)
             console.log("missing_lang",this.missing_lang)
             console.log("count",this.count)
             const expected = new Set();
             this.missing_lang = this.missing_lang.filter(item => !expected.has(JSON.stringify(item)) ? expected.add(JSON.stringify(item)) : false);
            console.log("unique values :",this.missing_lang)
             if(this.select2_array){
               this.select2_array_exists=true
               console.log("this.select2_array_exists",this.select2_array_exists)
             }
    
    
        },err=>{
          console.log(err);
    
        })

         
  
      })
  
    }          // filter and no sort json
  
  
  
    else if(!isEmpty && !event.multiSortMeta){
      console.log("yes filter and no sort table json")
      
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
       this.translationService.getSortedTranslation(object).subscribe((data)=>{
         console.log("getSortedTranslation :",data)
         this.select2_array=[]
         for(var i=0;i<data.translations.length;i++){
          this.select2_array.push(data.translations[i].fieldValue);
        }
         this.pageSize=data.pageSize
         console.log("array string",this.select2_array )
         console.log("Arraaaaay1 string",this.ArrayString1 )
         console.log("value of found contains : ",this.ArrayString1.filter(v => v.includes(event.filters[this.filterField].value)))
         const result = this.ArrayString1.filter(v => v.includes(event.filters[this.filterField].value))
  
         if (this.ArrayString1.filter(v => v.includes(event.filters[this.filterField].value))){
          this.select2_array=[]

          for(var i=0;i<result.length;i++){
            this.select2_array.push(result[i])
          }
          console.log("select2 array true found : ", this.select2_array)
          if(data.sortDirection == -1){
            this.descending= this.select2_array.sort((a,b) => (a > b ? -1 : 1))
            console.log("descending",this.descending)
          }else if(data.sortDirection == -1){
            this.ascending= this.select2_array.sort((a,b) => (a > b ? 1 : -1))
            console.log("ascending",this.ascending)
          }
          if(this.select2_array.length>0){
            this.loading=false
          }
          
          console.log("true found ")
  
        }else {
          console.log("not found ")
          console.log("ArrayString1",this.ArrayString1)
          
        } 
  
  
    
       })


      }else if(!isEmpty && event.multiSortMeta){    // yes sort yes filter json
        console.log("yes sorting and yes filter")
        this.loading = true;

        let object = {"pageNumber":currentPage-1,"pageSize":event.rows,"sortDirection":event.multiSortMeta[0].order.toString(),"sortField": event.multiSortMeta[0].field}
        this.translationService.getSortedTranslation(object).subscribe((data)=>{
          console.log("getSortedTranslation :",data)
          this.pageSize=data.pageSize
          this.tab=[]
          if(data.sortDirection == -1){
            this.descending= this.ArrayString1.sort((a,b) => (a > b ? -1 : 1))
            console.log("descending",this.descending)
            this.select2_array=[]
            for(var i=0 ; i<this.pageSize;i++){
              this.select2_array.push(this.descending[i])
              this.tab.push(this.descending[i])
    
            }
            console.log("tab descending",this.tab)
    
          }else if (data.sortDirection == 1){
            this.ascending= this.ArrayString1.sort((a,b) =>  (a > b ? 1 : -1))
            console.log("ascending",this.ascending)
            this.select2_array=[]
            for(var i=0 ; i<this.pageSize;i++){
              this.select2_array.push(this.ascending[i])
              this.tab.push(this.ascending[i])
    
            }
            console.log("tab ascending",this.tab)
    
          }
         
          const params = this.getRequestParams(currentPage, event.rows);
          this.translationService.select2(this.selected_table,this.selected_column,this.IsJson,this.columnsdto,params).subscribe((data)=>{
            console.log(data);
            this.select2_array = data.select2_array;
            this.ArrayString1 = data.ArrayString1
               console.log(this.ascending)
               console.log("currentPage",currentPage)
               console.log("pageSize",this.pageSize)
               console.log("ascending slice :",this.ascending.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize))
               if (this.ascending.length>0){
                this.select2_array=this.ascending.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize)
                console.log("filter :", event.filters)
                var keys = Object.keys(event.filters)
                console.log("keys :",keys[0])
                 this.filterField = keys[0]
                 console.log("filter fielterfield:", event.filters[this.filterField].value)
                 var obj = {};
                 obj[this.filterField] = event.filters[this.filterField].value;
                 console.log(obj)
         this.translationService.getSortedTranslation(object).subscribe((data)=>{
          console.log("getSortedTranslation :",data)
          this.pageSize=data.pageSize
          console.log("select2_array",this.select2_array )
          console.log("Arraaaaay1 string",this.ArrayString1 )
          console.log("value of found contains : ",this.ArrayString1.filter(v => v.includes(event.filters[this.filterField].value)))
          const result = this.ArrayString1.filter(v => v.includes(event.filters[this.filterField].value))
          if (this.ArrayString1.filter(v => v.includes(event.filters[this.filterField].value))){
            this.select2_array=[]
           for(var i=0;i<result.length;i++){
             this.select2_array.push(result[i])
           }
           this.count = this.select2_array.length
           this.select2_array=this.select2_array.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize)
            console.log("array string true found : ", this.select2_array)
            if(this.select2_array.length>0){
            this.loading = false;
      
      
            }
    
          }
        })
    
    
    
    
    
    
    
    
    
    
    
    
    
                 
                 
               }
             
          })
         
        
    
        })
    
    
      }
    
  
    

  }  




  setActiveTutorial(tutorial, index) {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
    console.log( "currentTutorial :", this.currentTutorial)

    console.log("currentIndex :",  this.currentIndex)
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

  open(content) {
    for(var i=0;i<this.list_columns.length;i++){
            if(this.list_columns[i].includes("id")){
            console.log("true")
            console.log(this.list_columns[i])
            this.list_columns.splice(i,1)
            break;
          }else console.log("false")
          }
          console.log(this.list_columns)

        
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  onSubmit(f: NgForm) {
    console.log(f.value)
    console.log(`http://localhost:8080/api/${this.selected_table}`)
    this.translationService.addEntity(this.selected_table,f.value).subscribe(data=>{
      this.ngOnInit();
      this.modalService.dismissAll();
    })

    
  }
  select1(value) {

    this.page=1
    this.select_array = [];
    this.select2_array=[]
    this.columns=[]
    this.selected_col=null
    this.columns_exists =false
    this.loading = true;
    console.log(value);
    console.log(this.selected_tab);
    console.log(this.last_array);
    for (var i = 0; i < this.last_array.length; i++) {
      if (this.last_array[i].TABLE_ABACUS_NAME == value) {
        this.columns = this.last_array[i].VALUE_JSON;
      }
    }
    var a = '"'+ this.selected_tab+  '"'; 
      console.log(a);
    this.translationService.select1(this.selected_table,this.selected_column,this.IsJson,a).subscribe((data)=>{
      console.log(data);
      
      this.select_array=data
      console.log(this.select_array)
      
      console.log(this.select_array[0].VALUE_JSON)
      for (var key in this.select_array[0].VALUE_JSON) {
        console.log(this.select_array[0].VALUE_JSON[key])
        if ( this.select_array[0].VALUE_JSON[key] == null || this.select_array[0].VALUE_JSON[key] == "" || this.select_array[0].VALUE_JSON[key] ==true || this.select_array[0].VALUE_JSON[key]==false || Number.isInteger(this.select_array[0].VALUE_JSON[key]) ){
          this.values_null.push(key)
        }
      }
      console.log(this.values_null)
      console.log(this.columns)
      this.columns = this.columns.filter(
        (item) => this.values_null.indexOf(item) < 0
      );
      console.log(this.columns)
      if(this.columns){
        this.columns_exists=true
        this.loading = false;
        console.log("table column exists :", this.columns_exists)

      }else{
        this.columns_exists=false
        console.log("table column exists :", this.columns_exists)

      } 

    })
   
   
  }
  columnsdto:any
  select2(value) {
    this.select2_array = [];
    this.db_data_json=[]
    this.select2_array_exists =false
    this.loading=true
    console.log(this.columns);
    console.log(value);
    console.log(this.selected_col);
    console.log(this.select_array)
    console.log(this.selected_tab);
    var a = '"'+ this.selected_tab+  '"'; 
    var b = '"'+ this.selected_col+  '"'; 
    console.log(a)
    console.log(b)

    var obj = {
      "column":this.selected_tab,
      "col":this.selected_col
  }
  this.columnsdto=obj
  console.log(this.selected_table);
  console.log(this.selected_column);
  console.log(this.IsJson);
  this.handlePageChangee(this.e)
  if(this.select2_array){
    this.loading=false
  }
  //const params = this.getRequestParams(this.page, this.pageSize);
  //console.log(params)

    // this.translationService.select2(this.selected_table,this.selected_column,this.IsJson,obj,params).subscribe((data)=>{
    //   console.log(data);
    //   this.select2_array = data.select2_array;
    //      this.db_data_json = data.db_data_json
    //      this.db1_data_json = data.db1_data_json
    //      this.missing = data.missing
    //      this.missing_lang= data.missing_lang
    //      this.count=data.count;
    //      console.log("select2_array",this.select2_array)
    //      console.log("db_data_json",this.db_data_json)
    //      console.log("db1_data_json",this.db1_data_json)
    //      console.log("missing",this.missing)
    //      console.log("missing_lang",this.missing_lang)
    //      console.log("count",this.count)
    //      const expected = new Set();
    //      this.missing_lang = this.missing_lang.filter(item => !expected.has(JSON.stringify(item)) ? expected.add(JSON.stringify(item)) : false);
    //     console.log("unique values :",this.missing_lang)
    //      if(this.select2_array){
    //        this.select2_array_exists=true
    //        console.log("this.select2_array_exists",this.select2_array_exists)
    //      }


    // },err=>{
    //   console.log(err);

    // })
  
  }
  getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  onKey(e: any,j) {
    console.log(j)
console.log(this.global_langues[j].locale)
    var tabKeyPressed = false;
    tabKeyPressed = e.keyCode == 9;
    if (tabKeyPressed) {
      e.preventDefault();
      return;
    }
    if (tabKeyPressed) {
      $(this).val('TAB');
      e.preventDefault();
      return;
    }
    this.values = e.target.value;
    console.log(this.values);
    this.array_translation_values.push(this.values);
  }

  onKeyUp(event,j){
    console.log(j)
    console.log(this.global_langues[j].locale)
    var inputValue = event.target.value;
    console.log(inputValue);
    if(inputValue.length > 0){
      this.translationService.AutocompleteTranslation(this.global_langues[j].locale,inputValue).subscribe((data)=>{
        console.log("filtered data",data)
        this.filteredTranslation = data;
        console.log("filteredTranslation data",this.filteredTranslation)
      })
      
  }else this.filteredTranslation=null
}
myClickFunction(j){
 
console.log(j)
console.log(this.global_langues[j].locale)

  if(this.filteredTranslation !=null){
    console.log("not empty")
    this.filteredTranslation=null
  }else     console.log(" empty")


  
}

  addTranslation(i) {
    this.values = [];
    var values = [];
    $("input[name='items[]']").each(function () {
      values.push($(this).val());
    });
    console.log(this.array_string);
    console.log("value de i : ",i)
    this.index=i
    console.log("value de index : ",this.index)
    console.log(values);
    console.log(values.length);
    console.log("this.array_string :",this.array_string);
    console.log("column value :",this.array_string[this.index]);
    console.log(this.list_columns);
    console.log(this.list_columns.indexOf(this.selected_column));
    this.column_index = this.list_columns.indexOf(this.selected_column);

    var num = 0;
    var num2 = 0;
    while (num < this.global_langues.length) {
      this.values.push({
        value: this.array_string[this.index],
        translation: {
          langue: this.global_langues[num].locale,
          value: values[this.index * this.global_langues.length + num],
        },
      });
      num++;
    }
      var hash = Object.create(null),
      result = this.values.reduce(function (r, a) {
        if (!hash[a.value]) {
          hash[a.value] = { value: a.value, data: [] };
          r.push(hash[a.value]);
        }
        hash[a.value].data.push(a.translation);
        console.log(r)
        return r;
      }, []);

    console.log(result[0]);
    console.log(this.missing);
    for (var j = 0; j < this.missing.length; j++) {
      if (this.array_string[this.index] == this.missing[j]) {
        this.add_edit = true;
        break;
      } else this.add_edit = false;
    }

    console.log(this.add_edit);

    if (this.add_edit == false) {
      console.log('edit');

      const object2 = { translations: result[0].data };
      console.log("object 2 value :",object2)
      console.log("array string index 0 :",this.array_string[this.index])

      this.eventService
        .editTranslation(
          this.array_string[this.index],
          this.selected_column,
          this.selected_table,
          "null",
          "null",
          object2
        )
        .subscribe((data) => {
          console.log(data);
          this.toast.success("I'm a toast!", "Translation edited succesfully!");

        },error=>{
          this.toast.error("I'm a toast!", "Translation not edited succesfully!");

        });
    } else {
      console.log('add');
      console.log("result:", result)
      console.log("fieldValue:", result[0].value)

      const object1 = {
        name_table: this.selected_table,
        fieldValue: result[0].value,
        selectedColumn: this.selected_column,
        tblabacusName:"null",
        tblabacusNameColumn:"null",
        translations: result[0].data,
      };
      console.log("object 1 values :",object1)
      this.eventService.addTranslation(object1).subscribe((data) => {
        console.log(data);
        this.toast.success("I'm a toast!", "Translation added succesfully!");
        
      },error=>{
        this.toast.error("I'm a toast!", "Translation not added succesfully!");

      });
    }
    console.log(this.values);
  }

  addTranslation1(i) {
    console.log(i);
    this.values = [];
    var values = [];

    $("input[name='items[]']").each(function () {
      values.push($(this).val());
    });
    console.log(values);
    console.log(values.length);
    console.log(this.select_array[i].VALUE_JSON);
    console.log(this.select_array[i].VALUE_JSON[this.selected_col]);
    var a = Object.values(this.select_array[i].VALUE_JSON);
    console.log(a);
    //console.log(a[0]);
    //console.log(this.array_translation_values); 
    var num = 0;
    while (num < this.global_langues.length) {
      this.values.push({
        value: this.select2_array[i],
        translation: {
          langue: this.global_langues[num].locale,
          value: values[i * this.global_langues.length + num],
        },
      });
      num++;
    }
    console.log("values :",this.values)

      var hash = Object.create(null),
      result = this.values.reduce(function (r, a) {
        if (!hash[a.value]) {
          hash[a.value] = { value: a.value, data: [] };
          r.push(hash[a.value]);
        }
        hash[a.value].data.push(a.translation);
        return r;
      }, []);

    console.log(result);
    console.log(this.missing);
    console.log(this.select2_array);
    console.log(result[0].data);
    for (var j = 0; j < this.missing.length; j++) {
      if (this.select2_array[i] == this.missing[j]) {
        this.add_edit = true;
        console.log('add');
        break;
      } else {
        this.add_edit = false;
        console.log('edit');
      }
    }
    if (this.add_edit == false) {
      console.log('edit');
      const object3 = { translations: result[0].data };
      this.eventService
        .editTranslation(
          this.select_array[i].VALUE_JSON[this.selected_col],
          this.selected_column,
          this.selected_table,
          this.selected_tab,
          this.selected_col,
          object3
        )
        .subscribe((data) => {
          console.log(data);
          this.toast.success("I'm a toast!", "Translation edited succesfully!");

        },err=>{
          this.toast.error("I'm a toast!", "Translation not edited succesfully!");

        });
    } else {
      console.log('add');
      const object4 = {
        name_table: this.selected_table,
        fieldValue: result[0].value,
        selectedColumn: this.selected_column,
        tblabacusName:this.selected_tab,
        tblabacusNameColumn:this.selected_col,
        translations: result[0].data,
      };
      console.log("object4 :",object4)
      this.eventService.addTranslation(object4).subscribe((data) => {
        console.log(data);
        this.toast.success("I'm a toast!", "Translation added succesfully!");

      },err=>{
        this.toast.error("I'm a toast!", "Translation not added succesfully!");

      });
    }
    console.log(this.add_edit);
    console.log(this.values);
  }

  getBoolean(value) {
    switch (value) {
      case true:
      case 'true':
      case 1:
      case '1':
      case 'on':
      case 'yes':
        return true;
      default:
        return false;
    }
  }
  udfValues(s){
    console.log(s);
    this.router.navigate(['/udf'])
    this.variablesGlobales.fieldName=s;
    this.variablesGlobales.tableName=this.selected_table
    this.variablesGlobales.column=this.selected_column
    this.variablesGlobales.json=this.boolValue
    //console.log("jsonArray value :",this.variablesGlobales.jsonArray)
    var data = this.jsonArray.filter((obj, pos, arr) => {
      return arr
        .map(mapObj => mapObj.FIELD_NAME)
        .indexOf(obj.FIELD_NAME) == pos;
    });
   
   console.log(data);
   var ID_UDF_LIST_VALUE = data.filter(item=>item.FIELD_NAME === s);
   console.log(ID_UDF_LIST_VALUE);
  this.variablesGlobales.ID_UDF_LIST_VALUE=ID_UDF_LIST_VALUE[0].ID_UDF_LIST_VALUE


  }


ngAfterViewInit() {
  var k : Keyboard
  this.keyboard = new Keyboard({
    onChange: input => this.onChange(input),
    onKeyPress: button => this.onKeyPress(button),
    layout: this.layoutsObj[this.selectedLayout]
  });
  console.log(this.keyboard)
  k = this.keyboard  ,
  setTimeout(() => {
  }, 3000);


}
onInputFocus() {
this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
}
copyInputMessage(inputElement){
  inputElement.select();
  document.execCommand('copy');
  inputElement.setSelectionRange(0, 0);
}

public isActive:boolean = false;
public test:boolean = true;  
onChange = (input: string) => {
this.value = input;
console.log("Input changed", input);
};

onKeyPress = (button: string) => {
console.log("Button pressed", button);

if (button === "{shift}" || button === "{lock}") this.handleShift();
};

onInputChange = (event: any) => {
this.keyboard.setInput(event.target.value);
};

onSelectChange = (event: any) => {
let value = event.target.value;
console.log("onSelectChange", event, value);
this.selectedLayout = value;
this.keyboard.setOptions({
  layout: this.layoutsObj[this.selectedLayout]
});
};

handleShift = () => {
let currentLayout = this.keyboard.options.layoutName;
let shiftToggle = currentLayout === "default" ? "shift" : "default";

this.keyboard.setOptions({
  layoutName: shiftToggle
});
};

row:number
cell:number
valeur = "a"
}




export interface DialogData {
  example: string;
}





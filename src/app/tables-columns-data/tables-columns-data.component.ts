import { Component, OnInit, ViewEncapsulation,ChangeDetectorRef,DoCheck, KeyValueDiffers, KeyValueDiffer, ElementRef, ViewChild, ViewChildren  } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
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



 

  constructor(
    private translationService: TranslationService,
    private route: ActivatedRoute,
    private eventService: EventService,
    private modalService: NgbModal,
    public dataDialogHandler: MatDialog,
    private toast: ToastrService
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
    this.selected_table = this.route.snapshot.params['name'];
    this.selected_column = this.route.snapshot.params['col'];
    this.IsJson = this.route.snapshot.params['json'];
    this.boolValue = this.getBoolean(this.IsJson); 
    console.log(this.boolValue);
    console.log(this.selected_table);
    console.log(this.selected_column);
    console.log(this.IsJson);
    this.translationService.getLangues().subscribe((data) => {
      this.langues = data;
      for (var i = 0; i < this.langues.length; i++) {
        if (this.langues[i].global == true) {
          this.count++;
          this.global_langues.push(this.langues[i]);
        }
      }
      console.log(this.count);
      console.log(this.langues);
      console.log(this.global_langues);

      console.log("trueeeeeeeee")
      this.eventService
        .getListColumns(this.selected_table)
        .subscribe((data) => {
          this.list_columns = data;
          console.log(this.list_columns);
          this.retrieveTranslation();
        })

    });  
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
  
  retrieveTranslation() {
    const params = this.getRequestParams(this.page+1, this.pageSize);
    console.log(params)
    if(this.boolValue == false){

      console.log("trueeeeeeeee")
      this.translationService.nameTypeColumnData(this.selected_table,this.selected_column,this.IsJson,params).subscribe((data)=>{
        console.log(data);
         this.array_string = data.arrayString;
         this.db_data = data.db_data
         this.db1_data = data.db1_data
         this.missing = data.missing
         this.missing_lang= data.missing_lang
         this.count = 3
         console.log("array_string",this.array_string)
        console.log("db_data",this.db_data)
        console.log("db1_data",this.db1_data)
        console.log("missing",this.missing)
        console.log("missing_lang",this.missing_lang)
        console.log("count",this.count)
        const expected = new Set();
        this.missing_lang = this.missing_lang.filter(item => !expected.has(JSON.stringify(item)) ? expected.add(JSON.stringify(item)) : false);
        console.log("unique values :",this.missing_lang)
  
      },err=>{
        console.log(err)
      })
    }else{
      console.log("falseeeeeeeeeeeee")

      this.translationService.nameTypeColumnDatajson(this.selected_table,this.selected_column,this.IsJson).subscribe((data)=>{
        console.log(data)
        this.last_array = data
        console.log("last_array",this.last_array)
        this.eventService.getTableData(this.selected_table).subscribe((data) => {
          this.tables = data;
          //console.log("tables",this.tables)

        })

      })
    }
    
  }


  handlePageChange(event) {
    this.page_change_paginate = false
    console.log(event)
    this.page=event
    if(this.page) {
      this.page_change_paginate = true
      this.select2_array_exists =false

    } else this.page_change_paginate = false
    console.log("page_change_paginate",this.page_change_paginate)
    const params = this.getRequestParams(this.page+1, this.pageSize);
    console.log(params)
    if(this.boolValue == false){
      console.log("trueeeeeeeee")
      this.translationService.nameTypeColumnData(this.selected_table,this.selected_column,this.IsJson,params).subscribe((data)=>{
        console.log(data);
         this.array_string = data.arrayString;
         this.db_data = data.db_data
         this.db1_data = data.db1_data
         this.missing = data.missing
         this.missing_lang= data.missing_lang
         this.count = data.count
         console.log("array_string",this.array_string)
        console.log("db_data",this.db_data)
        console.log("db1_data",this.db1_data)
        console.log("missing",this.missing)
        console.log("missing_lang",this.missing_lang)
      },err=>{
        console.log(err)
      })
    }else{
      console.log("falseeeeeeeeeeeee")
      this.translationService.nameTypeColumnDatajson(this.selected_table,this.selected_column,this.IsJson).subscribe((data)=>{
        console.log(data)
        this.last_array = data
        if(this.last_array) {
          this.page_change_paginate = true
          this.select2_array_exists =false

        } else this.page_change_paginate = false
        console.log("last_array",this.last_array)
        this.eventService.getTableData(this.selected_table).subscribe((data) => {
          this.tables = data;
          console.log(this.selected_tab)
          this.select2(this.selected_col)


        })

      })
    }
     }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    const params = this.getRequestParams(this.page+1, this.pageSize);
    console.log(params)
    if(this.boolValue == false){

      console.log("trueeeeeeeee")
      this.translationService.nameTypeColumnData(this.selected_table,this.selected_column,this.IsJson,params).subscribe((data)=>{
        console.log(data);
         this.array_string = data.arrayString;
         this.db_data = data.db_data
         this.db1_data = data.db1_data
         this.missing = data.missing
         this.missing_lang= data.missing_lang
         this.count = data.count
         console.log("array_string",this.array_string)
        console.log("db_data",this.db_data)
        console.log("db1_data",this.db1_data)
        console.log("missing",this.missing)
        console.log("missing_lang",this.missing_lang)
      },err=>{
        console.log(err)
      })
    }else{
      console.log("falseeeeeeeeeeeee")

      this.translationService.nameTypeColumnDatajson(this.selected_table,this.selected_column,this.IsJson).subscribe((data)=>{
        console.log(data)
        this.last_array = data
        if(this.last_array) {
          this.page_change_paginate = true
          this.select2_array_exists =false

        } else this.page_change_paginate = false
        console.log("last_array",this.last_array)
        this.eventService.getTableData(this.selected_table).subscribe((data) => {
          this.tables = data;
          console.log(this.selected_tab)
          this.select2(this.selected_col)

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
    // this.tables=[]
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
      //console.log(this.tables);
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
        console.log("table column exists :", this.columns_exists)

      }else{
        this.columns_exists=false
        console.log("table column exists :", this.columns_exists)

      } 

    })
   
   
  }
  select2(value) {
    this.select2_array = [];
    this.db_data_json=[]
    this.select2_array_exists =false
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
  console.log(this.selected_table);
  console.log(this.selected_column);
  console.log(this.IsJson);
  const params = this.getRequestParams(this.page+1, this.pageSize);
  console.log(params)

    this.translationService.select2(this.selected_table,this.selected_column,this.IsJson,obj,params).subscribe((data)=>{
      console.log(data);
      this.select2_array = data.select2_array;
         this.db_data_json = data.db_data_json
         this.db1_data_json = data.db1_data_json
         this.missing = data.missing
         this.missing_lang= data.missing_lang
         this.count=data.count;
         console.log("select2_array",this.select2_array)
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
    console.log(i);
    this.values = [];
    var values = [];
    $("input[name='items[]']").each(function () {
      values.push($(this).val());
    });
    console.log(values);
    console.log(values.length);
    console.log(this.array_string[i]);
    console.log(this.list_columns);
    console.log(this.list_columns.indexOf(this.selected_column));
    this.column_index = this.list_columns.indexOf(this.selected_column);

    var num = 0;
    var num2 = 0;
    while (num < this.global_langues.length) {
      this.values.push({
        value: this.array_string[i],
        translation: {
          langue: this.global_langues[num].locale,
          value: values[i * this.global_langues.length + num],
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
      if (this.array_string[i] == this.missing[j]) {
        this.add_edit = true;
        break;
      } else this.add_edit = false;
    }

    console.log(this.add_edit);

    if (this.add_edit == false) {
      console.log('edit');

      const object2 = { translations: result[0].data };
      this.eventService
        .editTranslation(
          this.array_string[i],
          this.selected_column,
          this.selected_table,
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
      const object1 = {
        name_table: this.selected_table,
        field_value: result[0].value,
        selected_column: this.selected_column,
        translations: result[0].data,
      };
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
    console.log(a[0]);
    console.log(this.array_translation_values); // 0
    var num = 0;
    var num2 = 0;
    while (num < this.global_langues.length) {
      this.values.push({
        value: this.select_array[i].VALUE_JSON[this.selected_col],
        translation: {
          langue: this.global_langues[num].locale,
          value: values[i * this.global_langues.length + num],
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
          object3
        )
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      console.log('add');
      const object4 = {
        name_table: this.selected_table,
        field_value: result[0].value,
        selected_column: this.selected_column,
        translations: result[0].data,
      };
      this.eventService.addTranslation(object4).subscribe((data) => {
        console.log(data);
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

/**
 * If you want to handle the shift and caps lock buttons
 */
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





import { Component, OnInit } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { TranslationService } from 'src/app/services/translation.service';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-tables-columns-data',
  templateUrl: './tables-columns-data.component.html',
  styleUrls: ['./tables-columns-data.component.css'],
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
  count: number;
  dp;
  abacus_name_column_index: number;
  c = 3;
  bool: Boolean = false;
  boolValue: Boolean;
  ACM_ADDRESS_SETTING = [];
  columns = [];
  last_array = [];
  select_array = [];
  select2_array = [];
  array_translation_values;
  container: any[] = [1];
  newArray: any = [{ key: 1, values: '' }];
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




  constructor(
    private translationService: TranslationService,
    private route: ActivatedRoute,
    private eventService: EventService,
    private modalService: NgbModal,
    public dataDialogHandler: MatDialog
  ) {}

  ngOnInit(): void {
    this.array_string=[]
    this.db_data=[]
    this.count = 0;
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
    });
    this.eventService.getTableData(this.selected_table).subscribe((data) => {
      this.tables = data;
      console.log(this.tables);
      this.eventService
        .getListColumns(this.selected_table)
        .subscribe((data) => {
          this.list_columns = data;
          console.log(this.list_columns);
          console.log(this.list_columns.indexOf(this.selected_column));
          this.column_index = this.list_columns.indexOf(this.selected_column);
          this.abacus_name_column_index =
            this.list_columns.indexOf('TABLE_ABACUS_NAME');
          for (var i = 0; i < this.tables.length; i++) {
            this.array_string.push(this.tables[i][this.column_index]);
            this.abacus_json_array.push(
              this.tables[i][this.abacus_name_column_index]
            );
            this.dp = [...new Set(this.abacus_json_array)];
          }
          for (var i = 0; i < this.dp.length; i++) {
            for (var j = 0; j < this.tables.length; j++) {
              if (this.tables[j][this.abacus_name_column_index] == this.dp[i]) {
                if (this.boolValue) {
                  var jsonStr = this.tables[j][this.column_index]
                    .replace(/\\n/g, '\\n')
                    .replace(/\\'/g, "\\'")
                    .replace(/\\"/g, '\\"')
                    .replace(/\\&/g, '\\&')
                    .replace(/\\r/g, '\\r')
                    .replace(/\\t/g, '\\t')
                    .replace(/\\b/g, '\\b')
                    .replace(/\\f/g, '\\f')
                    .replace(/[\u0000-\u0019]+/g, '');
                  this.tables[j][this.column_index] = JSON.parse(jsonStr);
                  this.ACM_ADDRESS_SETTING.push({
                    TABLE_ABACUS_NAME: this.dp[i],
                    VALUE_JSON: this.tables[j][this.column_index],
                  });
                } else
                  this.ACM_ADDRESS_SETTING.push({
                    TABLE_ABACUS_NAME: this.dp[i],
                    VALUE_JSON: this.tables[j][this.column_index],
                  });
              }
            }
          }
          const arr1 = this.getUniqueListBy(
            this.ACM_ADDRESS_SETTING,
            'TABLE_ABACUS_NAME'
          );
          console.log(arr1);
          this.columns = arr1;
          for (var i = 0; i < this.columns.length; i++) {
            console.log(this.columns[i].VALUE_JSON);
            this.last_array.push({
              TABLE_ABACUS_NAME: this.columns[i].TABLE_ABACUS_NAME,
              VALUE_JSON: Object.keys(this.columns[i].VALUE_JSON),
            });
          }
          console.log(this.last_array);
        });
      this.eventService.getTranslation().subscribe((data) => {
        this.array_translation_values = data;
        console.log(this.array_translation_values);

        for (var i = 0; i < this.array_translation_values.length; i++) {
          if (
            this.array_translation_values[i].name_table == this.selected_table
          ) {
            console.log(
              this.array_string.some((e) =>
                e.includes(this.array_translation_values[i].field_value)
              )
            );
            this.db_data.push(this.array_translation_values[i]);
          }
        }
        console.log(this.db_data);
        for (var j = 0; j < this.db_data.length; j++) {
          //console.log(this.array_string.includes(this.db_data[j].field_value));
          if (this.array_string.includes(this.db_data[j].field_value)) {
            //console.log(this.db_data[j].field_value);
            this.db1_data.push(this.db_data[j].field_value);
          }
        }
        console.log(this.db1_data);
        for (var j = 0; j < this.db_data.length; j++) {
          for (var i = 0; i < this.global_langues.length; i++) {
            var test =this.global_langues[i].locale
        var isPresent = this.db_data[j].translations.some(function(el){ return el.langue === test});
        if(isPresent == true){
          console.log("true",j)
        }else {
          console.log("false",j)
          this.missing_lang.push({field_value:this.db_data[j].field_value,langue:test})

        }
      }
        }
        console.log(isPresent);
        console.log(this.missing_lang);


        this.missing = this.array_string.filter(
          (item) => this.db1_data.indexOf(item) < 0
        );
        console.log(this.missing);
        for (var j = 0; j < this.db_data.length; j++) {

           this.missing_language=this.global_langues.filter(({ locale: id1 }) => !this.db_data[j].translations.some(({ langue: id2 }) => id2 === id1))
        }
        console.log(this.missing_language)
      });
    });
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
    this.select_array = [];
    this.selected_col=null
    console.log(value);
    console.log(this.last_array);
    for (var i = 0; i < this.last_array.length; i++) {
      if (this.last_array[i].TABLE_ABACUS_NAME == value) {
        this.columns = this.last_array[i].VALUE_JSON;
      }
    }
    for (var i = 0; i < this.tables.length; i++) {
      if (this.tables[i][this.abacus_name_column_index] == value) {
        this.select_array.push({
          TABLE_ABACUS_NAME: this.tables[i][this.abacus_name_column_index],
          VALUE_JSON: this.tables[i][this.column_index],
        });
      }
    }
    console.log(this.select_array[0].VALUE_JSON);
    for (var key in this.select_array[0].VALUE_JSON) {
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
  }
  select2(value) {
    this.select2_array = [];
    this.db_data_json=[]
    
    console.log(this.columns);
    console.log(value);
    console.log(this.selected_col);
    console.log(this.select_array)
    for (var i = 0; i < this.select_array.length; i++) {
      var a = this.selected_col;
      //console.log(this.select_array[i].VALUE_JSON[this.selected_col]);
      this.select2_array.push(
        this.select_array[i].VALUE_JSON[this.selected_col]
      );
    }
    console.log(this.select2_array);
    console.log(this.array_translation_values);
    for (var i = 0; i < this.array_translation_values.length; i++) {
      if (this.array_translation_values[i].name_table == this.selected_table) {
        console.log(
          this.select2_array.some((e) =>
            e == this.array_translation_values[i].field_value
          )
        );
        this.db_data_json.push(this.array_translation_values[i]);
      }
    }
    console.log(this.db_data_json);
    for (var j = 0; j < this.db_data_json.length; j++) {
      // console.log(
      //   this.select2_array.includes(this.db_data_json[j].field_value)
      // );
      if (this.select2_array.includes(this.db_data_json[j].field_value)) {
        //console.log(this.db_data_json[j].field_value);
        this.db1_data_json.push(this.db_data[j].field_value);
      }
    }
    console.log(this.db1_data_json);
    for (var j = 0; j < this.db_data_json.length; j++) {
      for (var i = 0; i < this.global_langues.length; i++) {
        var test =this.global_langues[i].locale
    var isPresent = this.db_data_json[j].translations.some(function(el){ return el.langue === test});
    if(isPresent == true){
      console.log("true",j)
    }else {
      console.log("false",j)
      this.missing_lang.push({field_value:this.db_data_json[j].field_value,langue:test})
      break;

    }
  }

    }
    console.log(this.missing_lang);
    this.missing = this.select2_array.filter(
      (item) => this.db1_data_json.indexOf(item) < 0
    );
    console.log(this.missing);

    for (var j = 0; j < this.db_data_json.length; j++) {

      this.missing_language=this.global_langues.filter(({ locale: id1 }) => !this.db_data_json[j].translations.some(({ langue: id2 }) => id2 === id1))
   }
   console.log(this.missing_language)
    console.log(this.array_is_empty)
    this.missing_lang= this.missing_lang.filter((v,i,a)=>a.findIndex(t=>(t.field_value === v.field_value && t.langue===v.langue))===i)
    console.log(this.missing_lang);

  }
  getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  onKey(e: any) {
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
}
function values(values: any) {
  throw new Error('Function not implemented.');
}
export interface DialogData {
  example: string;
}


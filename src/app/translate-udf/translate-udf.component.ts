import { Component, OnInit } from '@angular/core';
import { VariablesGlobales } from '../services/VariablesGlobales ';
import { TranslationService } from 'src/app/services/translation.service';
import { EventService } from './../services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-translate-udf',
  templateUrl: './translate-udf.component.html',
  styleUrls: ['./translate-udf.component.sass']
})
export class TranslateUdfComponent implements OnInit {
langues:any
global_langues=[]
count=0
acm_udf_list:any
pageSize = 2
col=[]
acm_udf_list_description =[]
 
array_string = [];
array_translation_values;
isActiveData=[]
db_data = [];
db1_data = [];
missing = [];
missing_lang =[];



  filteredTranslation: any;
  values: any[];
  index: any;
  list_columns: any;
  column_index: any;
  add_edit: Boolean = false;
  
  constructor(public variablesGlobales:VariablesGlobales,public toast: ToastrService,
    public translationService:TranslationService,public eventService:EventService) { }

  ngOnInit(): void {
    console.log("fieldName value :",this.variablesGlobales.fieldName)
    console.log("tableName value :",this.variablesGlobales.tableName)
    console.log("column value :",this.variablesGlobales.column)
    console.log("json value :",this.variablesGlobales.json)
    console.log("ID_UDF_LIST_VALUE value :",this.variablesGlobales.ID_UDF_LIST_VALUE)
   

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
e:any
handlePageChange(event){
  
 
        
  this.e=event
  let currentPage = event.first / event.rows + 1;
  const params = this.getRequestParams(currentPage, event.rows);
  this.acm_udf_list_description =[]
  this.acm_udf_list=[]
  this.global_langues=[]
  this.translationService.findListAcmUDF(this.variablesGlobales.ID_UDF_LIST_VALUE).subscribe(data=>{
    console.log(data)
   this.acm_udf_list=data
   console.log("acm_udf_list :",this.acm_udf_list)
   for(var i=0;i<this.acm_udf_list.length;i++){
     this.acm_udf_list_description.push(this.acm_udf_list[i].description)
   }
   console.log("acm_udf_list_description :",this.acm_udf_list_description.toString)
   this.count = this.acm_udf_list_description.length

   console.log("count :",this.count)


    this.translationService.getLangues().subscribe((data) => {
      this.langues = data;
      for (var i = 0; i < this.langues.length; i++) {
        if (this.langues[i].global == true) {
          this.global_langues.push(this.langues[i]);
        }
      }

      this.eventService
      .getListColumns(this.variablesGlobales.tableName)
      .subscribe((data) => {
        this.list_columns = data;
        console.log("list of columns :",this.list_columns);
      })
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
    this.col.push(this.col.splice(index, 1)[0]);
      console.log("global_langues", this.global_langues);
      var obj={"description":this.acm_udf_list_description}
      this.array_string=[]
      this.translationService.translateListUDF(obj,this.variablesGlobales.fieldName,this.variablesGlobales.column,this.variablesGlobales.json,params).subscribe(data=>{
        console.log("dataaaaaaaaaaaaaaa", data);
        console.log("hiiiiiiiiiiii")
        this.array_string = data.arrayString;
        this.db_data = data.db_data
        this.db1_data = data.db1_data
        this.missing = data.missing
        this.missing_lang= data.missing_lang

        const expected = new Set();
        this.missing_lang = this.missing_lang.filter(item => !expected.has(JSON.stringify(item)) ? expected.add(JSON.stringify(item)) : false);
        console.log("unique values :",this.missing_lang)
      })
    

  })



})
}
getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
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
  console.log(this.list_columns.indexOf(this.variablesGlobales.column));
  this.column_index = this.list_columns.indexOf(this.variablesGlobales.column);

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
    this.eventService
      .editTranslation(
        this.array_string[this.index],
        this.variablesGlobales.column,
        this.variablesGlobales.fieldName,
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
      name_table: this.variablesGlobales.fieldName,
      fieldValue: result[0].value,
      selectedColumn: this.variablesGlobales.column,
      tblabacusName:"null",
      tblabacusNameColumn:"null",
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

}

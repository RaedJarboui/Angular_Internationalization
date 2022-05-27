import { Component, OnInit } from '@angular/core';
import { VariablesGlobales } from '../services/VariablesGlobales ';
import { TranslationService } from 'src/app/services/translation.service';

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
  constructor(public variablesGlobales:VariablesGlobales,public translationService:TranslationService) { }

  ngOnInit(): void {
    console.log("fieldName value :",this.variablesGlobales.fieldName)
    console.log("tableName value :",this.variablesGlobales.tableName)
    console.log("column value :",this.variablesGlobales.column)
    console.log("json value :",this.variablesGlobales.json)
    console.log("ID_UDF_LIST_VALUE value :",this.variablesGlobales.ID_UDF_LIST_VALUE)
   

}

handlePageChange(e){
  console.log(e);
  this.translationService.findListAcmUDF(this.variablesGlobales.ID_UDF_LIST_VALUE).subscribe(data=>{
    console.log(data)
   this.acm_udf_list=data
   console.log("acm_udf_list :",this.acm_udf_list)

    this.translationService.getLangues().subscribe((data) => {
      this.langues = data;
      console.log("langues :",this.langues)
      for (var i = 0; i < this.langues.length; i++) {
        if (this.langues[i].global == true) {
          this.count++;
          this.global_langues.push(this.langues[i]);
        }
      }
      // console.log("golbal langues",this.global_langues)
      // for(var i=0;i<this.global_langues.length;i++){
      //   this.col.push(
      //     { field: 'fieldValue', header: 'Column value' },  
      //     { field: this.global_langues[i].locale, header: this.global_langues[i].locale },
      //     { field: 'Actions', header: 'Actions' }
      
      //   );
      // }

  })



})
}


}

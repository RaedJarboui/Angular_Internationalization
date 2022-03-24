import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-tables-columns',
  templateUrl: './tables-columns.component.html',
  styleUrls: ['./tables-columns.component.css']
})
export class TablesColumnsComponent implements OnInit {
  tables_columns;
  columns=[];
  col =[]
  name_table:string
  is_json:Boolean;
  value_json:Boolean
  heading = 'Bootstrap 5 Tables';
  subheading = 'Tables are the backbone of almost all web applications.';
  icon = 'pe-7s-drawer icon-gradient bg-happy-itmeo';
  constructor(public translationService:TranslationService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.name_table= this.route.snapshot.params['name'];
    console.log(this.name_table)
    this.translationService.getListColumnsType(this.name_table).subscribe((data)=>{
      this.tables_columns=data;
      console.log(this.tables_columns)
      for(var i=0;i<this.tables_columns.length;i++){
        this.columns.push(this.tables_columns[i])
      }
      console.log(this.columns);
      for(var i=0;i<this.columns.length;i++){
          const a =this.columns[i].split(',')
          console.log(a)
        this.col.push({name_column:a[0],type_column:a[1]});
      }
      console.log(this.col);
      if(this.col.some(e=>e.name_column.includes("JSON"))){
        console.log("true")
        this.value_json=true
      }else{
        console.log("false")
        this.value_json=false
      } 

    
    })
  }
  show(index){
    console.log(index)
    console.log("hi")
    console.log(this.col[index])
    if(this.col[index].name_column.includes("JSON")){
      console.log("true")
      this.is_json=true
      this.router.navigate(['tabscolumns',this.name_table,this.col[index].name_column,this.is_json])
    }else{  
      console.log("false")
      this.is_json=false
      this.router.navigate(['tabscolumns',this.name_table,this.col[index].name_column,this.is_json])
    } 
  }

}

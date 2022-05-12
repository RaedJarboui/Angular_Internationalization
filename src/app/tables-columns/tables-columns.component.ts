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
  col : any
  name_table:string
  is_json:Boolean;
  value_json:Boolean
  heading = 'Bootstrap 5 Tables';
  subheading = 'Tables are the backbone of almost all web applications.';
  icon = 'pe-7s-drawer icon-gradient bg-happy-itmeo';
  pageSize = 5
  count : number

  cols = [
    { field: 'name_column', header: 'name' },
    { field: 'type_column', header: 'type' },
    { field: 'actions', header: 'actions' },

];


  constructor(public translationService:TranslationService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.name_table= this.route.snapshot.params['name'];
    console.log(this.name_table)
    this.translationService.name_type_column(this.name_table).subscribe((data)=>{
      console.log(data);
      this.col = data ;
      this.count = this.col.length
      console.log(this.col)
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

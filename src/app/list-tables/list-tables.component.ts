import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/services/translation.service';

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

  constructor(private translationService : TranslationService,private router: Router) { }

  ngOnInit(): void {
    const params = this.getRequestParams(this.page+1, this.pageSize);
    console.log(params)
    this.translationService.getTableList().subscribe((data)=>{
      this.tables=data;
      console.log(this.tables);
     
    })
    this.translationService.getListTables().subscribe((data)=>{
      this.tables_list=data;
      console.log(this.tables_list)
      this.count = this.tables_list.length
      console.log(this.count)
    this.translationService.getPageableListTab(params).subscribe((data)=>{
      this.tab_list=data;
      console.log(data)
      if(this.tables_list.length == 0){
        console.log("condition 0")
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
          this.ngOnInit();
        })
      }
      else if(this.tables_list.length < this.tables.length){
        console.log("condition 1")
        for(var j=0;j<this.tables.length;j++){
          if(this.tables_list.some(e => e.tableName === this.tables[j])){
            console.log(this.tables[j])
          } else{
            console.log(this.tables[j])
            var obj1 = { a: this.tables[j] };
          var obj2 = { b: false };
          var merged = Object.assign(obj1, obj2);
          if(!this.selectedIds.find(o=>o.tableName === this.tables[j])){
            this.selectedIds.push({tableName:this.tables[j],translate:false});
    
          }
          console.log(this.selectedIds);
          }
          

        }
        if(this.selectedIds.length == 1){
          this.translationService.addTableList(this.selectedIds).subscribe((data)=>{
            console.log(data)
            this.ngOnInit();
          })
        }else if(this.selectedIds.length > 1){
           this.translationService.addTableList(this.selectedIds).subscribe((data)=>{
               console.log(data)
               this.ngOnInit();

             })
        }
      }else if(this.tables_list.length > this.tables.length){
        console.log("condition2")
      }
      console.log(this.tables_list)
    
    }) 
    })
    
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
  
  handlePageChange(event) {
    console.log(event)
    this.page=event
    const params = this.getRequestParams(this.page+1, this.pageSize);
    console.log(params)
    console.log(event)
    this.ngOnInit()
  }
  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    const params = this.getRequestParams(this.page+1, this.pageSize);
    console.log(params)
    this.ngOnInit()

  }


  details(i){
console.log(i);
console.log(this.tab_list[i])
this.router.navigate(['tabscolumns',this.tab_list[i].tableName])
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
      this.ngOnInit()
    })
  }
  
}



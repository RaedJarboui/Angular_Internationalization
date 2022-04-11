import { Component, Inject,ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, NgForm } from '@angular/forms';
import { TranslationService } from 'src/app/services/translation.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { data } from 'jquery';

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
  page = 1;
  count = 0;
  pageSize = 2;
  pageSizes = [1,2, 5, 10];
  currentTutorial = null;
  control = new FormControl();
  streets: string[] = [
    'Champs',
    'Lombard',
    'Abbey ',
    'Ac',
    'Fifth',
    'Faille',
  ];
  filteredStreets:Observable<any>;

  text = ''; //initialised the text variable

  constructor(public translationService:TranslationService,public dataDialogHandler: MatDialog,private modalService: NgbModal
    ) {


   }


  ngOnInit(): void {
    const params = this.getRequestParams(this.page+1, this.pageSize);
    console.log(params)
    this.translationService.getLangues().subscribe((data)=>{
        this.paginated_langues=data;
        this.count = this.paginated_langues.length
        console.log(this.count)
      this.translationService.getPageableLangues(params).subscribe((data)=>{
        this.langues=data;
        console.log(data)
  
      })
    })

    // this.filteredStreets = this.control.valueChanges.pipe(
    //   map((value) => this._filter(value))
    // );
    console.log(this.control)

    
  }
  onKeyUp(event){
    var inputValue = event.target.value;
    console.log(inputValue);
    if(inputValue.length > 0){
      this.translationService.findAllByText(inputValue).subscribe((data)=>{
        this.filteredStreets=data;
        console.log(this.filteredStreets)


      })
  }else this.filteredStreets=null
}
  private _filter(value: string) {
    console.log(this.control.value);
    if(this.control.value.length > 0){
      this.translationService.findAllByText(this.control.value).subscribe((data)=>{
        console.log(data)
        this.filteredStreets=data;
        // return data;

      })
      return this.filteredStreets
    //   const filterValue = this._normalizeValue(value);
    //   console.log(this.streets.filter((street) =>
    //   this._normalizeValue(street).includes(filterValue)
    // ))
    //   return this.streets.filter((street) =>
    //     this._normalizeValue(street).includes(filterValue)
    //   );
    }
   
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
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
  toggleVisibility(event,index){
   
    console.log(event.target.checked);
    console.log(index)
    console.log(this.langues[index])
    const obj = this.langues[index]
    const id = this.langues[index].id
    console.log(id)
    console.log(this.langues)
    this.translationService.editLangue(id,this.langues[index]).subscribe((data)=>{
      console.log(data);
      this.ngOnInit()
    })

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
        this.ngOnInit();
        this.modalService.dismissAll();
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
  onSubmit(f: NgForm) {
    console.log(f.value)

    this.translationService.addLangue(f.value).subscribe((data)=>{
      this.ngOnInit();
      console.log(f.value)
      this.modalService.dismissAll();

    })
  }
  

}

export interface DialogData {
  example: string;
}


function startWith(arg0: string): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}
// @Component({
//     selector: 'data-dialog',
//     templateUrl: './data-dialog.html'
// })
// export class DataDialogComponent {

//     constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }







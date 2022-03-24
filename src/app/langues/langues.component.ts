import { Component, Inject,ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-langues',
  templateUrl: './langues.component.html',
  styleUrls: ['./langues.component.css']
})
export class LanguesComponent implements OnInit {
  langues;
  closeResult:string
  searchTerm: string;
  page = 1;
  pageSize = 4;
  collectionSize: number;
  deleteId:number
  isGlobal:boolean
  heading = 'Bootstrap 5 Tables';
  subheading = 'Tables are the backbone of almost all web applications.';
  icon = 'pe-7s-drawer icon-gradient bg-happy-itmeo';
  countries = [
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      area: 17075200,
      population: 146989754
    },
    {
      name: 'Canada',
      flag: 'c/cf/Flag_of_Canada.svg',
      area: 9976140,
      population: 36624199
    },
    {
      name: 'United States',
      flag: 'a/a4/Flag_of_the_United_States.svg',
      area: 9629091,
      population: 324459463
    },
    {
      name: 'China',
      flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
      area: 9596960,
      population: 1409517397
    }
  ];

  constructor(public translationService:TranslationService,public dataDialogHandler: MatDialog,private modalService: NgbModal
    ) {

   }
//    public openDataDialog(): void {

//     const dialogConfig = new MatDialogConfig();

//     dialogConfig.data = {};

//     this.dataDialogHandler.open(DataDialogComponent, dialogConfig);
// }

  ngOnInit(): void {
    this.translationService.getLangues().subscribe((data)=>{
      this.langues=data;
      console.log(data)
      this.collectionSize =  this.langues.length;

    })
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

// @Component({
//     selector: 'data-dialog',
//     templateUrl: './data-dialog.html'
// })
// export class DataDialogComponent {

//     constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }







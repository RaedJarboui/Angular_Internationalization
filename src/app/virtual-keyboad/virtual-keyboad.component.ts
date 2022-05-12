import { Component, DoCheck, EventEmitter, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import Keyboard from "simple-keyboard";
import KeyboardLayouts from "simple-keyboard-layouts";
import * as $ from 'jquery';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';
import { TranslationService } from '../services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

library.add(fas as any);

@Component({
  selector: 'app-virtual-keyboad',
  encapsulation: ViewEncapsulation.None ,
  templateUrl: './virtual-keyboad.component.html',
  styleUrls: [
    "../../../node_modules/simple-keyboard/build/css/index.css",
    './virtual-keyboad.component.css'
  ]
})
export class VirtualKeyboadComponent implements OnInit {
  faCheck = faCheck;

  value = "";
  keyboard: Keyboard;
  keyboardLayouts: any;
  layouts: Array<object>;
  layoutsObj: object;
  selectedLayout: string = "english";
  visible = false;


  percentDone: number;
  uploadSuccess: boolean;
  fileName: string;
  fileData: any;

  langues=["ar","fr","en"]
  from_lang
  to_lang
  translation_doc:any

  

  

  private propertiesChanged: EventEmitter<any> = new EventEmitter();


  

  constructor(public translate: TranslateService,public translationService :TranslationService, private toast: ToastrService) {

    this.translate.addLangs(['en', 'fr','ar']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|ar/) ? browserLang : 'en');

    console.log(browserLang);
    this.keyboardLayouts = new KeyboardLayouts();

    this.layoutsObj = this.keyboardLayouts.get();
    this.layouts = Object.keys(this.layoutsObj).map(layoutName => ({
      name: layoutName,
      value: this.layoutsObj[layoutName]
    }));
    
   

   
  }
  ngOnInit(): void {
    
    
  }
  
  testToast() {
    this.toast.success("I'm a toast!", "Success!");
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
    valeur = "Raed"
    url:any
    e:any
    public onFileChange(event) {
      this.e=event;
      console.log(this.e)
      console.log("path :",event.target.value)
      const reader = new FileReader();
      /*if (event.target.files && event.target.files.length) {
        this.fileName = event.target.files[0].name;
        console.log("filename :",this.fileName)
        var a = event.target.value
        a = a.replace('fakepath','Users\\hp\\Desktop');
        console.log(a)
        this.url = "\""+ a+  "\""; 
        console.log("url :",this.url)
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
            
          localStorage.setItem(this.fileName, reader.result as string);
          console.log(a)
          this.translationService.readDocxFiles(a).subscribe((data)=>{
            console.log("document docs redead :",data)
            this.translationService.TranslateText("fr","ar",data).subscribe((data)=>{
              console.log("data translated",data)
            })
          
        })
        
        };

   
      }*/

    }

    onClick() {
      const fileData = localStorage.getItem(this.fileName);
      console.log(fileData)
      setTimeout(function() {
        //FireFox seems to require a setTimeout for this to work.
        document.body.appendChild(
          document.createElement("iframe")
        ).src = fileData;
      }, 0);
    }

    Download(){
      const reader = new FileReader();
      if (this.e.target.files && this.e.target.files.length) {
        this.fileName = this.e.target.files[0].name;
        console.log("filename :",this.fileName)
        var a = this.e.target.value
        a = a.replace('fakepath','Users\\hp\\Desktop');
        console.log(a)
        this.url = "\""+ a+  "\""; 
        console.log("url :",this.url)
        const [file] = this.e.target.files;
        reader.readAsDataURL(file);
        console.log("from langue :",this.from_lang)
        console.log("to langue :",this.to_lang)

        reader.onload = () => {
            
          localStorage.setItem(this.fileName, reader.result as string);
          console.log(a)
          this.translationService.readDocxFiles(a).subscribe((data)=>{
            console.log("document docs redead :",data)
            this.translationService.TranslateText(this.from_lang,this.to_lang,data).subscribe((data)=>{
              console.log("data translated",data)
              this.translation_doc=data
            })
          
        })
        
        };

   
      }

    }
   
   

   }

   



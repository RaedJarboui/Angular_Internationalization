import { Component, DoCheck, EventEmitter, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import Keyboard from "simple-keyboard";
import KeyboardLayouts from "simple-keyboard-layouts";
import * as $ from 'jquery';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';

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
  pass;
  private propertiesChanged: EventEmitter<any> = new EventEmitter();


  // get keyboardd():Keyboard {
  //   return this.keyboard;
  // }

  // set keyboarddd(k:Keyboard) {
  //   this.keyboard = k;
  //   this.propertiesChanged.emit(k);
  // }

  constructor() {
    this.keyboardLayouts = new KeyboardLayouts();

    this.layoutsObj = this.keyboardLayouts.get();
    this.layouts = Object.keys(this.layoutsObj).map(layoutName => ({
      name: layoutName,
      value: this.layoutsObj[layoutName]
    }));
    // this.keyboard = new Keyboard({
    //   onChange: input => this.onChange(input),
    //   onKeyPress: button => this.onKeyPress(button),
    //   layout: this.layoutsObj[this.selectedLayout]
    // });
    // this.propertiesChanged.subscribe(() =>
    //  this.changesDetected(),
    //  console.log( this.propertiesChanged)
    //  );

   
  }
  ngOnInit(): void {
    // const div = document.createElement('div');
    // div.className += "simple-keyboard";
    // document.body.appendChild(div);
  }
  
  
  changesDetected() {
    console.log('Changes detected');
  }
    

    ngAfterViewInit() {
      var k : Keyboard
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button),
        layout: this.layoutsObj[this.selectedLayout]
      });
      console.log(this.keyboard)
      k = this.keyboard
      

    }
    onInputFocus() {
      this.keyboard = new Keyboard({
            onChange: input => this.onChange(input),
            onKeyPress: button => this.onKeyPress(button)
          });
      }
      
      DeChange(){
        
      }
    toggle(){
      this.visible = !this.visible;
      console.log(this.visible)
  }
 


  public isActive:boolean = false;
  public test:boolean = true;

  onClick(e) {
    this.isActive = !this.isActive;
    console.log(this.isActive)
     if(this.isActive){
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      });
     }
     
  
  }
  
  
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

   


   }

 



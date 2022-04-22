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
  

  private propertiesChanged: EventEmitter<any> = new EventEmitter();


  

  constructor() {
    this.keyboardLayouts = new KeyboardLayouts();

    this.layoutsObj = this.keyboardLayouts.get();
    this.layouts = Object.keys(this.layoutsObj).map(layoutName => ({
      name: layoutName,
      value: this.layoutsObj[layoutName]
    }));
    
   

   
  }
  ngOnInit(): void {
    
    
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
    valeur = "a"
    ClickIcon(){
     
    

   
  }

   }

   



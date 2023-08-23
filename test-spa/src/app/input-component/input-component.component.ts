import { NumberSymbol } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.scss']
})
export class InputComponentComponent implements OnInit {
  @Input()
  public label: string = 'Label';
  @Input()
  public type: string = 'string';
  @Input()
  public input: number | string = '';
  @Input()
  public setFilter?: boolean = false;
  @Output() keyuUpEvent = new EventEmitter();

  public customInput!: number | string;
  public customType!: string;
  public customLabel!: string;

  constructor() {     
     }
 ngOnInit(): void {
  this.customInput = this.input;
  this.customType = this.type;
  this.customLabel = this.label;
 }
    public keyUp(event: KeyboardEvent): void {
      if(event.key === 'ArrowLeft' || event.key === 'ArrowRight')return;
      if (typeof Worker !== 'undefined') {
        const worker = new Worker(new URL('../app.worker', import.meta.url))
        worker.onmessage = ({ data }) => {
          this.keyuUpEvent.emit(data)
        };
        worker.postMessage({value: this.customInput, filter: this.setFilter});
      } else {

      }
    }
 
}
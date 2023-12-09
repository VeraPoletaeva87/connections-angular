import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class ConfirmationComponent {
  @Input() visible = false;
  @Output() closeEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();
  
  cancelHandler() {
    this.closeEmitter.emit();   
  } 

  deleteHandler() {
    this.deleteEmitter.emit();  
 }
}
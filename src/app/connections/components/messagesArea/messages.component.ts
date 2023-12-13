import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

export interface FormattedItem {
    name: string,
    date: string,
    message: string
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessageBlockComponent {
    @Input() formattedItems: FormattedItem[] = [];
    @Output() sendEmitter = new EventEmitter();

    constructor(
        private formBuilder: NonNullableFormBuilder
      ) {}

    createMessageForm = this.formBuilder.group({
        message: new FormControl('', [Validators.required]),
      });
        
      get message(): AbstractControl<string | null> | null { return this.createMessageForm.get('message'); }

      sendHandler() {
        if (!this.createMessageForm.invalid) {    
            const message = this.createMessageForm.controls.message.value;
            this.createMessageForm.controls.message.reset();
            this.sendEmitter.emit(message);   
            
        } else {
            this.createMessageForm.markAllAsTouched();
        } 
      }  
}

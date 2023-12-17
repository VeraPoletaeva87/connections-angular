import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ThemeService } from 'src/app/core/services/theme.service';

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

    isDarkTheme$ = this.themeService.isDarkTheme$;
    get isLight() {
      return !this.themeService.isDark;
    }

    constructor(
        private formBuilder: NonNullableFormBuilder,
        private themeService: ThemeService
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

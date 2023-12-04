import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settingsButton.component.html',
  styleUrls: ['./settingsButton.component.css']
})
export class SettingsComponent {
  @Output() settingsEmitter = new EventEmitter<boolean>();

  settingsClickHandler() {
    this.settingsEmitter.emit(true);
  } 

}
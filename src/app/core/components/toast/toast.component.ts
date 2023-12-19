import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  message$: Observable<string> = this.toastService.message$;
  show$: Observable<boolean> = this.toastService.show$;
  mode$: Observable<string> = this.toastService.mode$;

  constructor(private toastService: ToastService) {}
}

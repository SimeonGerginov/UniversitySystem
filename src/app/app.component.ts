import { Component, ViewContainerRef } from '@angular/core';
import { NotificationService } from './shared/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private notificationService: NotificationService,
              private vcr: ViewContainerRef) {
      this.notificationService.init(vcr);
  }
}

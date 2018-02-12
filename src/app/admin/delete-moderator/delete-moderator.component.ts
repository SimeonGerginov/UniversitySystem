import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { NotificationService } from '../../shared/services/notification.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-delete-moderator',
  templateUrl: './delete-moderator.component.html',
  styleUrls: ['./delete-moderator.component.css']
})
export class DeleteModeratorComponent implements OnInit {
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
              private adminService: AdminService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.adminService.deleteModerator(this.id)
        .map((r) => r.json())
        .subscribe((res) => {
          const { message } = res;
          this.notificationService.showSuccess(message);
          this.router.navigateByUrl('/home');
        }, (err) => {
          this.notificationService.showError(err);
        });
  }

}

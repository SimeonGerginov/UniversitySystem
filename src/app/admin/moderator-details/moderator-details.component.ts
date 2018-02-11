import { Component, Input } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-moderator-details',
  templateUrl: './moderator-details.component.html',
  styleUrls: ['./moderator-details.component.css']
})
export class ModeratorDetailsComponent {
  @Input()
  public moderator: User;

  constructor() { }

}

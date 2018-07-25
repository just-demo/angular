import {Component} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-production-notice',
  templateUrl: './production-notice.component.html',
  styleUrls: ['./production-notice.component.css']
})
export class ProductionNoticeComponent {
  visible = environment.production;
}

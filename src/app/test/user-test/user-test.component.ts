import { Component, OnInit } from '@angular/core';
import { SecurityConfigurationService } from '@app/security/services/security-configuration.service';

@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.scss']
})
export class UserTestComponent implements OnInit {

  result: any;
  constructor(private config: SecurityConfigurationService) { }

  ngOnInit() {
    this.result = this.config.FeatureRights;
  }

}

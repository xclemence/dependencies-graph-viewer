import '@app/core/extensions/form-group-touch';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthenticationService } from '@app/security/services';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.scss']
})
export class LogonComponent {

  logonForm: FormGroup;
  errorDisplayed = false;

  get userName() { return this.logonForm.get('userName'); }
  get password() { return this.logonForm.get('password'); }

  get hasErrors(): boolean { return !this.logonForm.valid; }

  constructor(formBuilder: FormBuilder, private _authenService: AuthenticationService, public dialogRef: MatDialogRef<LogonComponent>) {
    this.logonForm = formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      });
  }

  logon() {
    this.logonForm.touchAllControls();

    if (!this.logonForm.valid) {
      return;
    }

    this._authenService.logon(this.userName.value, this.password.value)
                       .subscribe(x => {
                          this.errorDisplayed = !x;

                          if (x) {
                            this.dialogRef.close(true);
                          }
                       });
  }
}

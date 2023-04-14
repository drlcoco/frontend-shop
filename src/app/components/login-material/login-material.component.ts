import {Component} from '@angular/core';
import {UntypedFormControl, Validators} from '@angular/forms';

/**
 * @title Input with error messages
 */
@Component({
  selector: 'input-errors-example',
  templateUrl: 'login-material.component.html',
  styleUrls: ['login-material.component.css'],
})
export class InputErrorsExample {
  emailFormControl = new UntypedFormControl('drlcoco@hotmail.com', [Validators.required, Validators.email]);
}

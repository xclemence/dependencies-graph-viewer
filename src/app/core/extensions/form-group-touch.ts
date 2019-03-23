import { FormControl, FormGroup } from '@angular/forms';

declare module '@angular/forms/src/model' {
    interface FormGroup {
        touchAllControls(): void;
    }
}

function touchAllControls(formGroup: FormGroup) {
    formGroup.markAsTouched({ onlySelf: true });

    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);

        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.touchAllControls(control);
        }
    });
}

FormGroup.prototype.touchAllControls = function() {
    return touchAllControls(this);
};


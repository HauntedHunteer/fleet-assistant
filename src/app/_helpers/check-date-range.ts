import { FormGroup } from '@angular/forms';

// custom validator to check that first date is less or equal second date
export function CheckDateRange(firstControlName: string, secondControlName: string) {
  return (formGroup: FormGroup) => {
    const startDate = formGroup.controls[firstControlName];
    const endDate = formGroup.controls[secondControlName];

    if (startDate.errors && !endDate.errors.checkDateRange) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on endDate if validation fails
    if (startDate.value - endDate.value > 0) {
      endDate.setErrors({ checkDateRange: true});
    } else {
      endDate.setErrors(null);
    }
  };
}

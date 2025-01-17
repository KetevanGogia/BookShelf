import { FormControl } from '@angular/forms';

export interface RegisterUser {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  entityNo: FormControl<number | null>;
}
export interface LoginUser {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
//firebase User
export interface FirebaseUser {
  displayName: string | null;
}

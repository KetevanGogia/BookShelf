import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BookCategories } from '../shared-books-carousel/enums/book-categories.enum';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-prompt-category-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    CapitalizePipe,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
  ],
  templateUrl: './prompt-category-dialog.component.html',
  styleUrl: './prompt-category-dialog.component.scss',
})
export class PromptCategoryDialogComponent {
  public bookCategories = Object.values(BookCategories).filter(
    (cat) => cat !== BookCategories.READ && cat !== BookCategories.WANT_TO_READ
  );
  public categoryForm = this.initialiseForm();
  readonly dialogRef = inject(MatDialogRef<PromptCategoryDialogComponent>);

  constructor(private fb: FormBuilder) {}

  public onContinueJourney() {
    this.dialogRef.close(this.categoryForm.controls['category'].value);
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  private initialiseForm(): FormGroup {
    return this.fb.group({
      category: this.fb.control('', [Validators.required]),
    });
  }
}

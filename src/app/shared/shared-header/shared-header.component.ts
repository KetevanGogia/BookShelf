import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  debounceTime,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  debounce,
} from 'rxjs';
import { User as FirebaseUser } from 'firebase/auth';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { BooksService } from '../../services/books/books.service';
import { BookEntity } from '../../models/book.models';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { LogOutComponent } from '../log-out/log-out.component';

@Component({
  selector: 'app-shared-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    RouterLink,
    CapitalizePipe,
    MatSelectModule,
    MatInputModule,
    AsyncPipe,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './shared-header.component.html',
  styleUrl: './shared-header.component.scss',
})
export class SharedHeaderComponent implements OnInit, OnDestroy {
  public title: string | undefined;
  public results: BookEntity[] | undefined;
  public user$: Observable<FirebaseUser> | undefined;
  public user: FirebaseUser | undefined;
  readonly dialog = inject(MatDialog);
  public searchField: FormControl = new FormControl();
  public searchForm: FormGroup = this.fb.group({ search: this.searchField });
  private unsubscribe$ = new Subject<void>();

  constructor(
    public authService: AuthService,
    private router: Router,
    private bookService: BooksService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.getCurrentUser() as any;
    this.user$?.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/']));
  }

  public searchBook() {
    if (this.title) {
      this.searchField.valueChanges
        .pipe(
          debounceTime(400),
          switchMap((term: string) => this.bookService.retrieveBook(term))
        )
        .subscribe((result: any) => {
          this.results = result.items;
        });
    }
  }

  public seeMore(book: BookEntity) {
    if (this.user) {
      this.router
        .navigate(['/dashboard/book', book.id, this.user.uid])
        .then(() => {
          this.results = undefined;
          this.title = undefined;
        });
    } else {
      this.router.navigate(['/book/', book.id]).then(() => {
        this.results = undefined;
        this.title = undefined;
      });
    }
  }

  public openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogOutComponent);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

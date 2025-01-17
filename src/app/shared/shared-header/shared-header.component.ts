import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { debounceTime, Observable } from 'rxjs';
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
  ],
  templateUrl: './shared-header.component.html',
  styleUrl: './shared-header.component.scss',
})
export class SharedHeaderComponent implements OnInit {
  public title: string | undefined;
  public results: BookEntity[] | undefined;
  public user$: Observable<FirebaseUser> | undefined;
  public user: FirebaseUser | undefined;
  readonly dialog = inject(MatDialog);

  constructor(
    public authService: AuthService,
    private router: Router,
    private bookService: BooksService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.getCurrentUser() as any;
    this.user$?.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/']));
  }

  public searchBook() {
    if (this.title) {
      this.bookService.retrieveBook(this.title).subscribe((data: any) => {
        this.results = data.items;
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
}

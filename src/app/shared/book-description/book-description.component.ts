import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books/books.service';
import { BookEntity } from '../../models/book.models';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data/data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReadStatus } from './enums/read-status.enum';

@Component({
  selector: 'app-book-description',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './book-description.component.html',
  styleUrl: './book-description.component.scss',
})
export class BookDescriptionComponent implements OnInit {
  public chosenBook: BookEntity | undefined;
  public userId: string | null = '';
  public allWantedBooks: any;
  public allReadBooks: any;
  public tooltipText: string | undefined;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookService: BooksService,
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDetails();
    this.getAllWantedBooks();
    this.getAlreadyReadBooks();
  }

  public getDetails() {
    this.cdr.detectChanges();
    let id;
    this.activatedRoute.params.subscribe((d) => {
      id = this.activatedRoute.snapshot.paramMap.get('id');
      this.userId = this.activatedRoute.snapshot.paramMap.get('uid');
      if (id) {
        this.bookService.retrieveBook(id).subscribe((book: any) => {
          if (book?.items) this.chosenBook = book?.items[0];
        });
      }
    });
  }

  public getAllWantedBooks() {
    if (this.userId)
      this.dataService.getAllBooks(this.userId).subscribe((books) => {
        const bookData = books.map((book) => {
          return book.payload.doc.data();
        });
        this.allWantedBooks = bookData;
      });
  }

  public getAlreadyReadBooks() {
    if (this.userId)
      this.dataService.getAllReadBooks(this.userId).subscribe((books) => {
        const bookData = books.map((book) => {
          return book.payload.doc.data();
        });
        this.allReadBooks = bookData;
      });
  }

  public controlAdding(): ReadStatus {
    const readBookIds = this.allReadBooks?.map((book: BookEntity) => book.id);
    const wantedBookIds: string[] = this.allWantedBooks?.map(
      (book: BookEntity) => book.id
    );
    if (this.chosenBook?.id) {
      if (readBookIds?.includes(this.chosenBook?.id)) {
        return ReadStatus.READ;
      }
      if (wantedBookIds?.includes(this.chosenBook?.id)) {
        return ReadStatus.WANTED;
      }
    }
    return ReadStatus.NOT_LISTED;
  }

  public addToWanted() {
    if (this.userId) {
      if (this.chosenBook) {
        this.dataService
          .addBook(this.chosenBook)
          .then(() => {
            this.toastr.success('added successfully');
          })
          .catch((err: any) => {
            this.toastr.error(err);
          });
      }
    } else {
      this.router.navigate(['auth/login']);
    }
  }

  public removeFromWanted() {
    if (this.userId) {
      if (this.chosenBook) {
        this.dataService
          .deleteBook(this.chosenBook, this.userId)
          .then(() => {
            this.toastr.success('removed successfully');
          })
          .catch((err) => {
            this.toastr.error(err);
          });
      }
    }
  }

  public defineTooltipText() {
    return 'mark as read';
  }

  public addToRead() {
    if (this.userId) {
      if (this.chosenBook) {
        this.dataService
          .addBookToAlreadyRead(this.chosenBook)
          .then(() => {
            this.toastr.success('added to read');
          })
          .catch((err: any) => {
            this.toastr.error(err);
          });
      }
    } else {
      this.router.navigate(['auth/login']);
    }
  }

  public removeFromReadBooks() {
    if (this.userId) {
      if (this.chosenBook) {
        this.dataService
          .deleteReadBook(this.chosenBook, this.userId)
          .then(() => {
            this.toastr.success('removed from read books');
          })
          .catch((err) => {
            this.toastr.error(err);
          });
      }
    }
  }
}

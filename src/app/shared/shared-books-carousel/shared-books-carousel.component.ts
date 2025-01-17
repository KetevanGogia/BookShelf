import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from '../../services/books/books.service';
import { BookCategories } from './enums/book-categories.enum';
import { CommonModule } from '@angular/common';
import { BookEntity, VolumeInfo } from '../../models/book.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { DataService } from '../../services/data/data.service';
import { NoDataTemplateComponent } from '../no-data-template/no-data-template.component';

@Component({
  selector: 'app-shared-books-carousel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    NoDataTemplateComponent,
  ],
  templateUrl: './shared-books-carousel.component.html',
  styleUrl: './shared-books-carousel.component.scss',
})
export class SharedBooksCarouselComponent implements OnInit {
  public category: string | null = this.retrieveParams();
  public uid = this.activatedRoute.snapshot.paramMap.get('uid');
  public slides: BookEntity[] | undefined;
  private default = BookCategories.FANTASY;
  public pageCount: number = 0;
  public user: any;
  public amount: number = 10;
  public bookCategories = BookCategories;

  constructor(
    public bookService: BooksService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: any) => {
      this.user = user;
    });
    if (this.category) {
      this.retrieveBooks(this.category);
    } else {
      this.retrieveBooks(this.default);
    }
  }

  public retrieveBooks(category: string) {
    if (this.category === BookCategories.READ && this.uid) {
      this.dataService.getAllReadBooks(this.uid).subscribe((books: any) => {
        const bookData = books.map((book: any) => {
          return book.payload.doc.data() as BookEntity;
        });
        this.slides = bookData;
        this.amount = bookData.length;
      });
    } else if (this.category === BookCategories.WANT_TO_READ && this.uid) {
      this.dataService.getAllBooks(this.uid).subscribe((books: any) => {
        const bookData = books.map((book: any) => {
          return book.payload.doc.data() as BookEntity;
        });
        this.slides = bookData;
        this.amount = bookData.length;
      });
    } else {
      this.bookService
        .retrieveBooksBasedOnCategory(category, this.amount)
        .subscribe((data) => {
          this.slides = data.items;
        });
    }
  }

  public seeMore(id: string) {
    if (this.user) {
      this.router.navigate(['/dashboard/book', id, this.user.uid]);
    } else {
      this.router.navigate(['/book/', id]);
    }
  }

  private retrieveParams(): string | null {
    return this.activatedRoute.snapshot.paramMap.get('id') || null;
  }

  public isActiveSlide(index: number) {
    return this.pageCount == index;
  }

  public increase() {
    if (this.pageCount < this.amount - 1) this.pageCount++;
  }

  public decrease() {
    if (this.pageCount >= 1) this.pageCount--;
  }
}

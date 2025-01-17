import { Component, HostListener, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { NgbCarouselModule, NgbConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../services/data/data.service';
import { BooksService } from '../../services/books/books.service';
import { BookCategories } from './enums/book-categories.enum';
import { BookEntity } from '../../models/book.models';
import { CommonModule } from '@angular/common';
import { NoDataTemplateComponent } from '../no-data-template/no-data-template.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-shared-carousel',
  standalone: true,
  imports: [
    CommonModule,
    NgbCarouselModule,
    NoDataTemplateComponent,
    MatIconModule,
    RouterLink,
    RouterModule,
    MatCardModule,
  ],
  templateUrl: './shared-carousel.component.html',
  styleUrl: './shared-carousel.component.scss',
})
export class SharedCarouselComponent implements OnInit {
  public uid = this.activatedRoute.snapshot.paramMap.get('uid');
  public category = this.activatedRoute.snapshot.paramMap.get('id');
  private default = BookCategories.FANTASY;
  public slides: BookEntity[] = [];
  public amount = 20;
  public bookChunks: BookEntity[][] = [];
  public chunkSize: number = 3;
  public bookCategories = BookCategories;
  public user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    public bookService: BooksService,
    private router: Router,
    private authService: AuthService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateCarousel();
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: any) => {
      this.user = user;
    });
    this.updateCarousel();
    if (this.category) {
      this.retrieveBooks(this.category);
    } else {
      this.retrieveBooks(this.default);
    }
  }

  private retrieveBooks(category: string) {
    if (this.category === BookCategories.READ && this.uid) {
      this.dataService.getAllReadBooks(this.uid).subscribe((books: any) => {
        const bookData = books.map((book: any) => {
          return book.payload.doc.data() as BookEntity;
        });
        this.slides = bookData;
        this.amount = bookData.length;
        if (this.slides) this.updateCarousel();
      });
    } else if (this.category === BookCategories.WANT_TO_READ && this.uid) {
      this.dataService.getAllBooks(this.uid).subscribe((books: any) => {
        const bookData = books.map((book: any) => {
          return book.payload.doc.data() as BookEntity;
        });
        this.slides = bookData;
        this.amount = bookData.length;
        if (this.slides) this.updateCarousel();
      });
    } else {
      this.bookService
        .retrieveBooksBasedOnCategory(category, this.amount)
        .subscribe((data) => {
          this.slides = data.items;
          if (this.slides) this.updateCarousel();
        });
    }
  }
  chunkArray(books: BookEntity[]): any[] {
    const chunks = [];
    for (let i = 0; i < books.length; i += this.chunkSize) {
      chunks.push(books.slice(i, i + this.chunkSize));
    }
    return chunks;
  }

  public updateCarousel() {
    if (window.innerWidth < 1200 && window.innerWidth > 600) {
      this.chunkSize = 3;
    } else if (window.innerWidth < 600 && window.innerWidth > 420) {
      this.chunkSize = 2;
    } else if (window.innerWidth < 420) {
      this.chunkSize = 1;
    }
    this.bookChunks = this.chunkArray(this.slides);
  }

  public seeMore(id: string) {
    if (this.user) {
      this.router.navigate(['/dashboard/book', id, this.user.uid]);
    } else {
      this.router.navigate(['/book/', id]);
    }
  }
}

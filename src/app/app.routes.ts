import { Routes } from '@angular/router';
import { SharedBooksCarouselComponent } from './shared/shared-books-carousel/shared-books-carousel.component';
import { AnonymGuard } from './guards/anonym.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthGuard } from './guards/auth.guard';
import { BookDescriptionComponent } from './shared/book-description/book-description.component';
import { SharedCarouselComponent } from './shared/shared-carousel/shared-carousel.component';

export const routes: Routes = [
  {
    path: '',
    component: SharedCarouselComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: MainPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/booklist/:id/:uid',
    component: SharedCarouselComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/book/:id/:uid',
    component: BookDescriptionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book/:id',
    component: BookDescriptionComponent,
    canActivate: [AnonymGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookEntity, VolumeId } from '../../models/book.models';
import { Observable } from 'rxjs';
import { env } from '../../../env/env';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks() {}

  retrieveBook(volumeId: VolumeId): Observable<BookEntity> {
    return this.http.get<BookEntity>(
      `${env.BOOKS_BASE_URL}?q=${volumeId}&maxResults=5&key=${env.BOOKS_API}`
    );
  }

  retrieveBooksBasedOnCategory(
    category: string,
    amount: number
  ): Observable<any> {
    return this.http.get(
      `${env.BOOKS_BASE_URL}?q=subject:${category}&maxResults=${amount}&key=${env.BOOKS_API}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  httpClient = inject(HttpClient);

  httpGetAllBooks() {
    return this.httpClient.get<Respose<Book[]>>('http://localhost:3000/book/getAllBooks');
  }
}

export type Book = {
  _id: string
  title: string
  isbn13: string
  price: string
  image: string
  url: string
}

export type Respose<T> = {
  statusCode: number
  message: string
  data: T
}
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../types/book.model';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = `${environment.apiUrl}/books`;

  books = signal<Book[]>([]);
  selectedBook = signal<Book | null>(null);

  constructor(private http: HttpClient) {
    this.fetchBooks();
  }

  fetchBooks() {
    this.http.get<Book[]>(this.apiUrl).subscribe(this.books.set);
  }

  getBook(id: string) {
    this.http
      .get<Book>(`${this.apiUrl}/${id}`)
      .subscribe(this.selectedBook.set);
  }

  createBook(book: Book) {
    this.http.post<Book>(this.apiUrl, book).subscribe(() => this.fetchBooks());
  }

  updateBook(id: string, book: Partial<Book>) {
    this.http
      .patch<Book>(`${this.apiUrl}/${id}`, book)
      .subscribe(() => this.fetchBooks());
  }

  deleteBook(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.fetchBooks());
  }

  clearSelected() {
    this.selectedBook.set(null);
  }
}

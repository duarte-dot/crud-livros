import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book-service';

@Component({
  standalone: true,
  selector: 'app-book-list',
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Books</h2>
    <button [routerLink]="['/create']">Add Book</button>

    <ul>
      @for (book of books(); track book.id) {
      <li>
        {{ book.title }} by {{ book.author }}
        <button [routerLink]="['/edit', book.id]">Edit</button>
        <button (click)="book.id && deleteBook(book.id)">Delete</button>
      </li>
      }
    </ul>
  `,
})
export class BookListComponent implements OnInit {
  books = computed(() => this.bookService.books());

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.fetchBooks();
  }

  deleteBook(id: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id);
    }
  }
}

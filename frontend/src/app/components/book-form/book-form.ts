import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book-service';

@Component({
  standalone: true,
  selector: 'app-book-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    @if (isEdit) {
    <h2>Edit Book</h2>
    } @else {
    <h2>Create Book</h2>
    }

    <form [formGroup]="form" (ngSubmit)="submitForm()">
      <label>
        Title:
        <input formControlName="title" />
      </label>
      <label>
        Author:
        <input formControlName="author" />
      </label>
      <button type="submit">Save</button>
    </form>
  `,
})
export class BookFormComponent implements OnInit {
  form!: FormGroup;

  isEdit = false;
  id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [''],
      author: [''],
    });

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.id = idParam ? idParam : null;
      this.isEdit = !!this.id;

      if (this.isEdit && this.id) {
        this.bookService.getBook(this.id);

        const checkInterval = setInterval(() => {
          const book = this.bookService.selectedBook();
          if (book) {
            this.form.patchValue(book);
            clearInterval(checkInterval);
          }
        }, 100);
      }
    });
  }

  submitForm() {
    const book = {
      title: this.form.value.title ?? '',
      author: this.form.value.author ?? '',
    };

    if (this.isEdit && this.id) {
      this.bookService.updateBook(this.id, book);
    } else {
      this.bookService.createBook(book);
    }

    this.router.navigate(['/']);
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

import { take } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public listBook: Book[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public readonly bookService: BookService
  ) {}

  ngOnInit(): void {
    this.getBooks();

    //Acessar e manipular a DOM via Angular não é recomendado, mas caso seja necessário, podemos fazer da seguinte forma:
    this.document.defaultView.alert('Hello');

    // window.alert('Hello');
  }

  public getBooks(): void {
    this.bookService
      .getBooks()
      .pipe(take(1))
      .subscribe((resp: Book[]) => {
        this.listBook = resp;
      });
  }
}

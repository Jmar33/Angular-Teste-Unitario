import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { Book } from '../models/book.model';
import { BookService } from './book.service';

const bookList: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    price: 15,
    amount: 2,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 2,
    amount: 4,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 8,
    amount: 7,
  },
];

const book = {
  name: '',
  author: '',
  isbn: '',
  price: 15,
  amount: 1,
};

describe('BookService', () => {
  let service: BookService,
    httpMocK: HttpTestingController,
    storage = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMocK = TestBed.inject(HttpTestingController);

    storage = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) =>
      storage[key] ? storage[key] : null
    );

    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        return (storage[key] = value);
      }
    );
  });

  afterEach(() => {
    //O método verify checa se não existem solicitações https pendentes
    httpMocK.verify();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('getbooks return a list of book and does get a method ', () => {
    service.getBooks().subscribe((resp: Book[]) => {
      expect(resp).toEqual(bookList);
    });

    const req = httpMocK.expectOne(environment.API_REST_URL + `/book`);
    expect(req.request.method).toEqual('GET');

    // O método flush é um mock que pode ser usado para o retorno de algum método http
    req.flush(bookList);
  });

  // Por padrão esse método irá acessar diretamente o localStore, o que não é nossa intenção
  // Já que isso pode acabar poluindo o localStorage, sem necessidade.
  // Sendo assim criamos um spyOn para o localStorage no método beforeEach
  it('getBooksFromCart return empty array when localStorage is empty', () => {
    const listBooks = service.getBooksFromCart();
    expect(listBooks.length).toBe(0);
  });

  it('addBookToCart add a book successfully when the list does not exists in the localStorage', () => {
    const toast = {
      fire: () => null,
    } as any;
    const mixinSpy = spyOn(Swal, 'mixin').and.callFake(() => toast);
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
    service.addBookToCart(book);
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    service.addBookToCart(book);
    expect(mixinSpy).toHaveBeenCalled();
  });

  it('removeBooksFromCart removes the list from localStorage', () => {
    service.addBookToCart(book);
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    service.removeBooksFromCart();
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });
});

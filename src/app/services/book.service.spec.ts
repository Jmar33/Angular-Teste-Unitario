import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.prod';
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

describe('BookService', () => {
  let service: BookService, httpMocK: HttpTestingController;

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
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { HomeComponent } from './home.component';

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

const bookServiceMock = {
  getBooks: () => of(bookList),
};

// Podemos usar os prefixos f e x
// para poder dar foco ou desabilitar seja um teste ou uma suíte específica
// f -> usado para dar foco a uma suíte ou teste específico
// x -> usado para desabilitar uma suíte ou teste específico

describe('Home Component', () => {
  let component: HomeComponent,
    fixture: ComponentFixture<HomeComponent>,
    service: BookService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [
        // BookService
        {
          provide: BookService,
          useValue: bookServiceMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(BookService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBooks works correctly', () => {
    component.getBooks();
    debugger;
    expect(component.listBook.length).toBe(2);
  });
});

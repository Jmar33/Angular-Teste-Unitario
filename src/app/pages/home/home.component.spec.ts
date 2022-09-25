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

describe('Home Component', () => {
  let component: HomeComponent,
    fixture: ComponentFixture<HomeComponent>,
    service: BookService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [BookService],
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
    const getBooksSpy = spyOn(service, 'getBooks').and.returnValue(
      of(bookList)
    );

    component.getBooks();
    expect(getBooksSpy).toHaveBeenCalled();
    expect(component.listBook.length).toBe(3);
  });
});

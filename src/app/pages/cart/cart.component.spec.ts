import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CartComponent } from './cart.component';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';

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

describe('Cart Component', () => {
  let component: CartComponent,
    fixture: ComponentFixture<CartComponent>,
    service: BookService;

  // Em schemas podemos importas essas duas constantes CUSTOM_ELEMENTS e NO_ERROS_SCHEMA
  // para evitar possíveis erros
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartComponent],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  // Uma boa prática é usarmos dois beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    service = fixture.debugElement.injector.get(BookService);
    component = fixture.componentInstance;
    fixture.detectChanges(); //Ao charmamos esse detectChanges estamos simulando o comportamento
    // do NgOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTotalPrice return an amount', () => {
    const totalPrice = component.getTotalPrice(bookList);
    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBeNull();
  });

  it('onInputNumberChange increments correctly', () => {
    const action = 'plus';
    const book = Object.assign({}, bookList[0]);

    const updateAmountBookSpy = spyOn(service, 'updateAmountBook').and.callFake(
      () => null
    );
    const getTotalPriceSpy = spyOn(component, 'getTotalPrice').and.callFake(
      () => null
    );

    expect(book.amount).toBe(2);

    component.onInputNumberChange(action, book);

    expect(updateAmountBookSpy).toHaveBeenCalled();
    expect(getTotalPriceSpy).toHaveBeenCalled();
    expect(book.amount).toBe(3);
  });

  it('onInputNumberChange increments correctly', () => {
    const action = 'minus';
    const book = Object.assign({}, bookList[0]);

    const updateAmountBookSpy = spyOn(service, 'updateAmountBook').and.callFake(
      () => null
    );
    const getTotalPriceSpy = spyOn(component, 'getTotalPrice').and.callFake(
      () => null
    );

    expect(book.amount).toBe(2);

    component.onInputNumberChange(action, book);

    expect(updateAmountBookSpy).toHaveBeenCalled();
    expect(getTotalPriceSpy).toHaveBeenCalled();
    expect(book.amount).toBe(1);
  });
});

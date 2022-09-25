import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CartComponent } from './cart.component'
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';

const bookList: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    price: 15,
    amount: 1
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 2,
    amount: 4
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 8,
    amount: 7
  },
]

describe("Cart Component", () =>{

  let component: CartComponent,
  fixture: ComponentFixture<CartComponent>

  // Em schemas podemos importas essas duas constantes CUSTOM_ELEMENTS e NO_ERROS_SCHEMA
  // para evitar possíveis erros
  beforeEach(() =>{
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations:[
        CartComponent
      ],
      providers:[
        BookService
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
  })

  // Uma boa prática é usarmos dois beforeEach
  beforeEach(() =>{
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance
    fixture.detectChanges() //Ao charmamos esse detectChanges estamos simulando o comportamento
                            // do NgOnInit()
  })

  it('should create', () =>{

    expect(component).toBeTruthy()
  })


  it("getTotalPrice return an amount", () =>{

    const totalPrice = component.getTotalPrice(bookList)
    expect(totalPrice).toBeGreaterThan(0)
    expect(totalPrice).not.toBeNull()
  })
})


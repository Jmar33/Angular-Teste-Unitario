import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from './nav.component';

class ComponentRouteTest {}

const routeServiceMock = {
  navigate: () => null,
};

describe('NavComponent', () => {
  let component: NavComponent, fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule.withRoutes([
        //   {
        //     path: 'home',
        //     component: ComponentRouteTest,
        //   },
        //   {
        //     path: 'cart',
        //     component: ComponentRouteTest,
        //   },
        // ]),
      ],
      declarations: [NavComponent],
      providers: [
        {
          provide: Router,
          useValue: routeServiceMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Uma solução alternativa para testar um serviço que não conhecemos é
  // Criar um serviço Mockado
  // **Atenção: no caso do das rotas sempre devemos dar preferência pelo uso
  // do RouterTestingModule do que criar um mock, como foi feito nesse exemplo!
  it('should navigate', () => {
    const router = TestBed.inject(Router);

    const spyNavigate = spyOn(router, 'navigate');

    component.navTo('');
    expect(spyNavigate).toHaveBeenCalled();
  });
});

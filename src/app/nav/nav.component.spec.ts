import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from './nav.component';

class ComponentRouteTest {}

describe('NavComponent', () => {
  let component: NavComponent, fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: ComponentRouteTest,
          },
          {
            path: 'cart',
            component: ComponentRouteTest,
          },
        ]),
      ],
      declarations: [NavComponent],
      providers: [],
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

  it('should navigate', () => {
    const router = TestBed.inject(Router);

    const spyNavigate = spyOn(router, 'navigate');

    component.navTo('home');
    expect(spyNavigate).toHaveBeenCalledWith(['/home']);

    component.navTo('cart');
    expect(spyNavigate).toHaveBeenCalledWith(['/cart']);
  });
});
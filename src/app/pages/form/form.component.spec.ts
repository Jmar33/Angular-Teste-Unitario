import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';

fdescribe('Form Component', () => {
  let component: FormComponent, fixture: ComponentFixture<FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [FormComponent],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('name field is required', () => {
    const nameField = component.form.get('name');
    nameField.setValue('');
    expect(nameField.invalid).toBeTruthy();
  });

  it('name field has an error with more than 5 characters', () => {
    const nameField = component.form.get('name');
    nameField.setValue('test name');
    expect(nameField.invalid).toBeTruthy();
  });

  it('name field is correct with less than 5 chareacters', () => {
    const nameField = component.form.get('name');
    nameField.setValue('Jack');
    expect(nameField.valid).toBeTruthy();
  });

  it('email field is required', () => {
    const emailField = component.form.get('email');
    emailField.setValue('');
    expect(emailField.invalid).toBeTruthy();
  });

  it('email field must be valid', () => {
    const emailField = component.form.get('email');
    emailField.setValue('test@');
    expect(emailField.valid).toBeFalsy();
    emailField.setValue('test@test.com');
    expect(emailField.valid).toBeTruthy();
  });

  it('form is valid', () => {
    const emailField = component.form.get('email');
    const nameField = component.form.get('name');

    emailField.setValue('test@test.com');
    nameField.setValue('Jack');

    expect(component.form.valid).toBeTrue();
  });
});

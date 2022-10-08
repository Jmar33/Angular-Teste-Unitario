import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirmation-dialog.component';

const MatDialogRefMock = {
  close: () => null,
};

describe('Confirm dialog component', () => {
  let component: ConfirmDialogComponent,
    fixture: ComponentFixture<ConfirmDialogComponent>,
    service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ConfirmDialogComponent],
      providers: [
        // MAT_DIALOG_DATA, MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: MatDialogRefMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    service = TestBed.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onConfirm send true', () => {
    // const service = fixture.debugElement.injector.get(MatDialogRef);
    // const service = TestBed.inject(MatDialogRef);
    // Dessa segunda forma conseguimos injetar um serviço de forma mais limpa
    const dialogRefSpy = spyOn(service, 'close');
    component.onConfirm();
    expect(dialogRefSpy).toHaveBeenCalledWith(true);
  });

  it('onDismiss send false', () => {
    const dialogRefSpy = spyOn(service, 'close');
    component.onDismiss();
    expect(dialogRefSpy).toHaveBeenCalledWith(false);
  });
});

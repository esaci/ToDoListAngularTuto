import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTacheComponent } from './form-tache.component';

describe('FormTacheComponent', () => {
  let component: FormTacheComponent;
  let fixture: ComponentFixture<FormTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ajout bien dans le premier input', () => {
    const fixture = TestBed.createComponent(FormTacheComponent);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input1');
    input.value = 'Ajout';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  });

});

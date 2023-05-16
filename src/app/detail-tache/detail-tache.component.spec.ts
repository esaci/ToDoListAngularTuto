import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTacheComponent } from './detail-tache.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DetailTacheComponent', () => {
  let component: DetailTacheComponent;
  let fixture: ComponentFixture<DetailTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTacheComponent ],
      imports: [HttpClientTestingModule, AppRoutingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListTacheComponent } from './list-tache.component';
import { TacheService } from './tache.service';
import { of } from 'rxjs';

describe('ListTacheComponent', () => {
  let component: ListTacheComponent;
  let fixture: ComponentFixture<ListTacheComponent>;
  let tacheService: TacheService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTacheComponent],
      imports: [HttpClientTestingModule],
      providers: [TacheService],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListTacheComponent);
    component = fixture.componentInstance;
    tacheService = TestBed.inject(TacheService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doit appeler la méthode addTache de TacheService', () => {
    const addTacheSpy = spyOn(tacheService, 'addTache');
    component.addTache();
    expect(addTacheSpy).toHaveBeenCalled();
  });

  it("doit effacer l'intervalle lorsque ngOnDestroy est appelé", () => {
    const clearIntervalSpy = spyOn(window, 'clearInterval');
    component.intervalId = 123;
    component.ngOnDestroy();
    expect(window.clearInterval).toHaveBeenCalledWith(123);
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('doit appeler la méthode increaseProgress de TacheService', async () => {
    const increaseProgressSpy = spyOn(tacheService, 'increaseProgress');
    component.ngOnInit();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // setTimeout(() => {
    expect(tacheService.increaseProgress).toHaveBeenCalled();
    expect(increaseProgressSpy).toHaveBeenCalled();
    // }, 1000);
  }
  );

  it('doit appeler la méthode quand le boutton "Ajouter une tache" est clique', () => {
    const addTacheSpy = spyOn(component, 'addTache');
    const buttonElement = fixture.nativeElement.querySelector('#buttonAjout');
    buttonElement.click();
    expect(component.addTache).toHaveBeenCalled();
    expect(addTacheSpy).toHaveBeenCalled();
  });

  it('doit afficher les informations sur la progression dans le modèle', async () => {
    component.info = { notification: null, progress: 0 };
    fixture.detectChanges();
    const compteurElement = fixture.nativeElement.querySelector('#compteur');
    expect(compteurElement.textContent).toContain('0');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    fixture.detectChanges();
    expect(compteurElement.textContent).toContain('2');
  });
});

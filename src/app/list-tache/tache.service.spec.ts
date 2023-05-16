import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Info, TacheService } from './tache.service';
import { concatMap, delay } from 'rxjs';

describe('TacheService', () => {
  let service: TacheService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TacheService],
    });
    service = TestBed.inject(TacheService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Assure qu'il n'y a pas de requêtes HTTP en suspens
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('doit obtenir la liste des tâches', fakeAsync(() => {
    const tachesSimulees = ['Tâche 1', 'Tâche 2', 'Tâche 3'];
    let i = 0;

    service.getList().subscribe(value => {
      expect(value).toEqual(tachesSimulees[i]);
      i++;
    });
    for (let j = 0; j < tachesSimulees.length; j++) {
      tick();
    }
    const req = httpMock.expectOne('http://185.209.223.19:8100/getList');
    expect(req.request.method).toEqual('GET');
    req.flush({ data: tachesSimulees });
  }));

  it('doit lancer la requete POST', () => {
    const testInfo: Info = { notification: null, progress: 0 };
  
    service.addTache(testInfo);
  
    const req = httpMock.expectOne('http://185.209.223.19:8100/add');
    expect(req.request.method).toEqual('POST');
  });
  
});

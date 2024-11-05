import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoriqueCommandePage } from './historique-commande.page';

describe('HistoriqueCommandePage', () => {
  let component: HistoriqueCommandePage;
  let fixture: ComponentFixture<HistoriqueCommandePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueCommandePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoriqueCommandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

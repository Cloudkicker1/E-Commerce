import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStorePageComponent } from './main-store-page.component';

describe('MainStorePageComponent', () => {
  let component: MainStorePageComponent;
  let fixture: ComponentFixture<MainStorePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainStorePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainStorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

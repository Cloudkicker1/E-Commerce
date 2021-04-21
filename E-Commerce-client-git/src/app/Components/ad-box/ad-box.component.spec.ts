import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdBoxComponent } from './ad-box.component';

describe('AdBoxComponent', () => {
  let component: AdBoxComponent;
  let fixture: ComponentFixture<AdBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

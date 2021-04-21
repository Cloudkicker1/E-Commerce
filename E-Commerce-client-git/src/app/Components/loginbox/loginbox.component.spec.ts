import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginboxComponent } from './loginbox.component';

describe('LoginboxComponent', () => {
  let component: LoginboxComponent;
  let fixture: ComponentFixture<LoginboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

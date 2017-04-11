import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePoolPageComponent } from './home-pool-page.component';

describe('HomePoolPageComponent', () => {
  let component: HomePoolPageComponent;
  let fixture: ComponentFixture<HomePoolPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePoolPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePoolPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inserting } from './inserting';

describe('Inserting', () => {
  let component: Inserting;
  let fixture: ComponentFixture<Inserting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inserting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inserting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

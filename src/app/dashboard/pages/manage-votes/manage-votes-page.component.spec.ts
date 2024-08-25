import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVotesPageComponent } from './manage-votes-page.component';

describe('ManageVotesPageComponent', () => {
  let component: ManageVotesPageComponent;
  let fixture: ComponentFixture<ManageVotesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageVotesPageComponent]
    });
    fixture = TestBed.createComponent(ManageVotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

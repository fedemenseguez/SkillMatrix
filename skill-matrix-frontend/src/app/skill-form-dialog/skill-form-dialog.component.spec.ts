import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillFormDialogComponent } from './skill-form-dialog.component';

describe('SkillFormDialogComponent', () => {
  let component: SkillFormDialogComponent;
  let fixture: ComponentFixture<SkillFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptCategoryDialogComponent } from './prompt-category-dialog.component';

describe('PromptCategoryDialogComponent', () => {
  let component: PromptCategoryDialogComponent;
  let fixture: ComponentFixture<PromptCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptCategoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromptCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

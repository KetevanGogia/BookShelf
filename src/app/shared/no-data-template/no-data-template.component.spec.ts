import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataTemplateComponent } from './no-data-template.component';

describe('NoDataTemplateComponent', () => {
  let component: NoDataTemplateComponent;
  let fixture: ComponentFixture<NoDataTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDataTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoDataTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

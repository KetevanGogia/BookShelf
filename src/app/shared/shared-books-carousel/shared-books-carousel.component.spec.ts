import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedBooksCarouselComponent } from './shared-books-carousel.component';

describe('SharedBooksCarouselComponent', () => {
  let component: SharedBooksCarouselComponent;
  let fixture: ComponentFixture<SharedBooksCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedBooksCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedBooksCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

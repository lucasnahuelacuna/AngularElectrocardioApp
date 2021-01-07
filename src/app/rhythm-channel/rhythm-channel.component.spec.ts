import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhythmChannelComponent } from './rhythm-channel.component';

describe('RhythmChannelComponent', () => {
  let component: RhythmChannelComponent;
  let fixture: ComponentFixture<RhythmChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhythmChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhythmChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

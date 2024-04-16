import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogradouroListaComponent } from './logradouro-lista.component';

describe('LogradouroListaComponent', () => {
  let component: LogradouroListaComponent;
  let fixture: ComponentFixture<LogradouroListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogradouroListaComponent]
    });
    fixture = TestBed.createComponent(LogradouroListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

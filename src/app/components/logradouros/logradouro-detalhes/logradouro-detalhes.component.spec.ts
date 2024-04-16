import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogradouroDetalhesComponent } from './logradouro-detalhes.component';

describe('LogradouroDetalhesComponent', () => {
  let component: LogradouroDetalhesComponent;
  let fixture: ComponentFixture<LogradouroDetalhesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogradouroDetalhesComponent]
    });
    fixture = TestBed.createComponent(LogradouroDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

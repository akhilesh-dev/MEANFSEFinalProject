import { TestBed } from '@angular/core/testing';

import { ViewTaskService } from './view-task.service';
import { HttpClientModule } from '@angular/common/http';

describe('ViewTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({     
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: ViewTaskService = TestBed.get(ViewTaskService);
    expect(service).toBeTruthy();
  });
});

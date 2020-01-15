import { TestBed } from '@angular/core/testing';

import { AddTaskService } from './add-task.service';
import { HttpClientModule } from '@angular/common/http';

describe('AddTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({    
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: AddTaskService = TestBed.get(AddTaskService);
    expect(service).toBeTruthy();
  });
});

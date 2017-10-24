import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {AppModule} from '../../app.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MockCustomAuthHttpService} from '../../../mock/custom-auth-http-service.mock';
import {Observable} from 'rxjs/Rx';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockAuthHttp: MockCustomAuthHttpService;

  beforeEach(async(() => {

    mockAuthHttp = new MockCustomAuthHttpService();
    TestBed.configureTestingModule({
      imports: [AppModule, FormsModule, RouterModule],
      declarations: [ProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    fixture.detectChanges();
    mockAuthHttp.post.and.returnValue(Observable.of());
    component.onSubmit();
  });

  it('should show error', () => {
    component.newPassword = 'password';
    component.confirmPassword = 'fakePassword';
    fixture.detectChanges();
    component.onSubmit();
  });
});

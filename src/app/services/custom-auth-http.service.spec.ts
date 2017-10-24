import {inject, TestBed} from '@angular/core/testing';
import {CustomAuthHttpService} from './custom-auth-http.service';
import {Router} from '@angular/router';
import {AppModule} from '../app.module';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Rx';
import {Response, ResponseOptions} from '@angular/http';
import {MockRouter} from '../../mock/router.mock';
import {environment} from '../../environments/environment';
import {ModalService} from './modal.service';
import {MockModalService} from '../../mock/modal-service.mock';

describe('CustomAuthHttpService', () => {
  let mockRouter;
  let authHttpStub;


  beforeEach(() => {
    mockRouter = new MockRouter();
    //noinspection ReservedWordAsName
    authHttpStub = {
      get: jasmine.createSpy('get'),
      put: jasmine.createSpy('put'),
      post: jasmine.createSpy('post'),
      delete: jasmine.createSpy('delete')
    };

    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        {
          provide: ModalService,
          useClass: MockModalService
        },
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: AuthHttp,
          useValue: authHttpStub
        }
      ]
    });
  });

  it('should get', inject([CustomAuthHttpService], (service: CustomAuthHttpService) => {
    authHttpStub.get.and.returnValue(Observable.of(new Response(new ResponseOptions({
      body: JSON.stringify({data: {id: 1}})
    }))));

    service.get('random').subscribe((data) => {
      expect(data.data.id).toBe(1);
    });

    expect(authHttpStub.get).toHaveBeenCalled();
  }));

  it('should put', inject([CustomAuthHttpService], (service: CustomAuthHttpService) => {
    authHttpStub.put.and.returnValue(Observable.of(new Response(new ResponseOptions({
      body: JSON.stringify({data: {id: 1}})
    }))));

    service.put('random', {test: 'data'}).subscribe((data) => {
      expect(data.data.id).toBe(1);
    });

    expect(authHttpStub.put).toHaveBeenCalledWith(environment.apiPrefix + 'random', {test: 'data'}, undefined);
  }));

  it('should post', inject([CustomAuthHttpService], (service: CustomAuthHttpService) => {
    authHttpStub.post.and.returnValue(Observable.of(new Response(new ResponseOptions({
      body: JSON.stringify({data: {id: 1}})
    }))));

    service.post('random', {test: 'data'}).subscribe((data) => {
      expect(data.data.id).toBe(1);
    });

    expect(authHttpStub.post).toHaveBeenCalledWith(environment.apiPrefix + 'random', {test: 'data'}, undefined);
  }));

  it('should delete', inject([CustomAuthHttpService], (service: CustomAuthHttpService) => {
    authHttpStub.delete.and.returnValue(Observable.of(new Response(new ResponseOptions({
      body: JSON.stringify({data: {id: 1}})
    }))));

    service.delete('random').subscribe((data) => {
      expect(data.data.id).toBe(1);
    });

    expect(authHttpStub.delete).toHaveBeenCalledWith(environment.apiPrefix + 'random', undefined);
  }));

  it('should handle auth error', inject([CustomAuthHttpService], (service: CustomAuthHttpService) => {
    authHttpStub.get.and.returnValue(new Observable(observable => {
      observable.error(new Response(new ResponseOptions({
        body: JSON.stringify({data: {id: 1}}),
        status: 401
      })));
    }));

    service.get('random').subscribe((data) => {
      expect(data.data.id).toBe(1);
    });

    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
    expect(authHttpStub.get).toHaveBeenCalled();
  }));

  it('should handle other errors', inject([CustomAuthHttpService], (service: CustomAuthHttpService) => {
    authHttpStub.get.and.returnValue(new Observable(observable => {
      observable.error(new Response(new ResponseOptions({
        body: JSON.stringify({error: {message: 'test error'}}),
        status: 500,
        statusText: 'test error',
      })));
    }));
    spyOn(console, 'error');

    service.get('random').subscribe(null,
      (err) => expect(err.error.message).toBe('test error')
    );

    expect(console.error).toHaveBeenCalledWith('500 - test error');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledTimes(0);
    expect(authHttpStub.get).toHaveBeenCalled();
  }));
});

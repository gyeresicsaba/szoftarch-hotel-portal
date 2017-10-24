import {CanAccessPipe} from './can-access.pipe';
import {User} from '../models/user';

describe('CanAccessPipe', () => {
  let pipe: CanAccessPipe;
  let modules: { path: string, name: string }[];

  beforeEach(() => {
    pipe = new CanAccessPipe();
    modules = [
      {path: 'pag', name: 'PAG'},
      {path: 'tampon', name: 'Tampon'},
      {path: 'milktoxin', name: 'Különminta'}
    ];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter', () => {
    const fakeUser = new User({modules: {pag: {}, milktoxin: {}}});

    const filtered = pipe.transform(modules, fakeUser);
    expect(filtered.length).toBe(2);
  });
});

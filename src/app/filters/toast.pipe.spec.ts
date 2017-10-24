import {ToastFilterPipe} from './toast.pipe';
import {Toast} from '../models/toast';
import {BootstrapTypes} from '../models/bootstrap-types';

describe('ToastFilterPipe', () => {
  let pipe: ToastFilterPipe;
  let toasts: Toast[];

  beforeEach(() => {
    pipe = new ToastFilterPipe();
    toasts = [
      new Toast(BootstrapTypes.success, '1'),
      new Toast(BootstrapTypes.success, '2'),
      new Toast(BootstrapTypes.success, '3')
    ];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter', () => {
    toasts[1].visible = false;

    const filtered = pipe.transform(toasts);
    expect(filtered.length).toBe(2);
  });

  it('should reverse', () => {
    const filtered = pipe.transform(toasts);
    expect(filtered[0].title).toBe('3');
    expect(filtered[2].title).toBe('1');
  });
});

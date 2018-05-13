import { AllegianceNamePipe } from './allegiance-name.pipe';

describe('AllegianceNamePipe', () => {
  it('create an instance', () => {
    const pipe = new AllegianceNamePipe();
    expect(pipe).toBeTruthy();
  });
  it('can render neutrality', () => {
    const pipe = new AllegianceNamePipe();
    expect(pipe.transform('strict')).toBe('strict');
  });
  it('can render nation', () => {
    const pipe = new AllegianceNamePipe();
    expect(pipe.transform({ name: 'Germany' })).toBe('Germany');
  });
});

import { ReduceTextPipe } from './reduce-text.pipe';

describe('Reduce Pipe', () => {
  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform works correctly', () => {
    let text = 'Hello this is test to check the pipe';
    let newText = pipe.transform(text, 5);
    expect(newText.length).toBe(5);
  });
});

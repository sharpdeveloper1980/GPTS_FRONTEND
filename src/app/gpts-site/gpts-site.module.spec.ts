import { GptsSiteModule } from './gpts-site.module';

describe('GptsSiteModule', () => {
  let gptsSiteModule: GptsSiteModule;

  beforeEach(() => {
    gptsSiteModule = new GptsSiteModule();
  });

  it('should create an instance', () => {
    expect(gptsSiteModule).toBeTruthy();
  });
});

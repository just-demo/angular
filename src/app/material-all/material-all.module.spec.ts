import { MaterialAllModule } from './material-all.module';

describe('MaterialAllModule', () => {
  let materialAllModule: MaterialAllModule;

  beforeEach(() => {
    materialAllModule = new MaterialAllModule();
  });

  it('should create an instance', () => {
    expect(materialAllModule).toBeTruthy();
  });
});

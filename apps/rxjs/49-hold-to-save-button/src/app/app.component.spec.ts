import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  beforeEach(async () => {
    await render(AppComponent);
  });
});

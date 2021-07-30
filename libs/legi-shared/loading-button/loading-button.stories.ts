import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';
import { LoadingButtonModule } from '@cognizone/legi-shared/loading-button';
import { moduleMetadata } from '@storybook/angular';

// tslint:disable
export default {
  title: 'legi-shared/czLoadingButton directive',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [LoadingButtonModule, MatButtonModule, MatIconModule],
      entryComponents: [MatSpinner],
    }),
  ],
};

export const LoadingButton = () => ({
  template: `
    <div class="container mt-3">
      <div class="row">
        <button (click)="loading = !loading">Loading: {{loading}}</button>
      </div>
      <div class="row">
        <div class="col">
          <button mat-button color="primary" [czLoadingButton]="loading">Test me</button>
        </div>
        <div class="col">
          <button mat-raised-button color="primary" [czLoadingButton]="loading">Test me</button>
        </div>
        <div class="col">
          <button mat-raised-button color="primary" [czLoadingButton]="loading">
          <mat-icon>add</mat-icon>
          Test me
          </button>
        </div>
        <div class="col">
          <button mat-icon-button color="primary" [czLoadingButton]="loading">
          <mat-icon>add</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  props: {
    loading: false,
  },
});

LoadingButton.story = {
  name: 'czLoadingButton',
};

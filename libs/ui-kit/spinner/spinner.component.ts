import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cz-spinner',
  standalone: true,
  template: ``,
  styles: [
    `
      :host {
        --size: 20px;
        --color: var(--cz-color-primary, #007bff);
        --color-background: #ccc;

        position: relative;
        display: inline-block;
        width: var(--size);
        height: var(--size);

        &:before {
          content: '';
          box-sizing: border-box;
          position: absolute;
          top: calc(50% - var(--size) / 2);
          left: calc(50% - var(--size) / 2);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: max(2px, calc(var(--size) / 10)) solid var(--color-background);
          border-top-color: var(--color);
          animation: spinner 0.6s linear infinite;

          @keyframes spinner {
            to {
              transform: rotate(360deg);
            }
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}

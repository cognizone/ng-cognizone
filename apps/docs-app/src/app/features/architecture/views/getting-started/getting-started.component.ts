import { Component } from '@angular/core';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
})
export class GettingStartedComponent {
  lastUpdate: Date = new Date('2020-01-15');

  lintingCommand = 'npx -p @cognizone/cli cz-cli add-linting -i';

  tsconfig1 = `
  {
    // ...
    "compilerOptions": {
      // ...
      "paths": {
        "@app/*": ["src/app/*"],
        "@env/*": ["src/environments/*"]
      },
      "strict": true,
      // ...
    },
    // ...
  }
  `;
}

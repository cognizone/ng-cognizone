import { Component } from '@angular/core';

@Component({
  selector: 'app-libraries-list',
  templateUrl: './libraries-list.view.html',
  styleUrls: ['./libraries-list.view.scss'],
})
export class LibrariesListView {
  descriptions: LibDescription[] = [
    {
      path: 'model-utils',
      title: 'model-utils',
      description: 'Utility library for typescript and rxjs',
    },
    {
      path: 'ng-core',
      title: 'ng-core',
      description: 'Utility library for angular apps',
    },
    {
      path: 'ng-yasgui',
      title: 'ng-yasgui',
      description: 'An angular wrapper for yasgui',
    },
  ];
}

interface LibDescription {
  title: string;
  description: string;
  path: string;
  img?: string;
}

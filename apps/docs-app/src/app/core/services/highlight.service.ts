/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-unassigned-import */
import { Injectable } from '@angular/core';

import 'clipboard';
import 'prismjs';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/plugins/toolbar/prism-toolbar';
// import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
// import 'prismjs/plugins/line-numbers/prism-line-numbers';

declare let Prism: any;

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  highlight(code: string, language: string = 'typescript'): string {
    return Prism.highlight(code, Prism.languages[language], language);
  }
}

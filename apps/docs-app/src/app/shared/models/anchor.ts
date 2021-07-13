import { ActivatedRoute } from '@angular/router';

export interface Anchor {
  text: string;
  id: string;
  route: ActivatedRoute;
  target: HTMLElement;
}

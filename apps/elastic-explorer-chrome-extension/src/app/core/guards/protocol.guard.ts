import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

import { ProtocolService } from '../services/protocol.service';

@Injectable({
  providedIn: 'root',
})
export class ProtocolGuard implements CanActivate {
  constructor(private router: Router, private protocolService: ProtocolService) {}

  canActivate(next: ActivatedRouteSnapshot): UrlTree | boolean {
    const prefix = `${this.protocolService.protocol}://`;
    const url = next.url
      .map(s => s.path)
      .join('/')
      .replace('/?', '?'); // "/?" appears when clicking on links in slack for example, but not on copy/paste...
    if (url.startsWith(prefix)) {
      const actual = url.slice(prefix.length);
      return this.router.parseUrl(actual);
    }
    return true;
  }
}

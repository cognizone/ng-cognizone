import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Logger } from '@cognizone/ng-core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  COGNIZONE_MATERIAL_ICONS_OPTIONS_TOKEN,
  CognizoneMaterialIconsOptions,
  DEFAULT_COGNIZONE_MATERIAL_ICONS_OPTIONS,
} from '../models/cognizone-material-icons-options';

@Injectable()
export class CognizoneMatIconRegistry extends MatIconRegistry {
  private registered: Set<string> = new Set();

  private options: Required<CognizoneMaterialIconsOptions>;

  constructor(
    private sanitizer: DomSanitizer,
    http: HttpClient,
    errorHandler: ErrorHandler,
    @Inject(COGNIZONE_MATERIAL_ICONS_OPTIONS_TOKEN) options: CognizoneMaterialIconsOptions,
    private logger: Logger
  ) {
    super(http, sanitizer, document, errorHandler);
    this.options = { ...DEFAULT_COGNIZONE_MATERIAL_ICONS_OPTIONS, ...options };
    this.logger = logger.extend('SvgMaterialIconsService');
  }

  /**
   *
   * @description If we fail to get an icon the first time, we try to register it as a material icon, then if it fails, it fails "hard"
   */
  getNamedSvgIcon(name: string, namespace: string = ''): Observable<SVGElement> {
    return super.getNamedSvgIcon(name, namespace).pipe(
      catchError(err => {
        if (!this.registered.has(name)) {
          this.logger.debug(`Trying to auto-register material icon named "${name}"`);
          this.addSvgIcon(name, this.getFilePath(name, this.options.mainTheme));
          this.options.otherThemes.forEach(theme => {
            this.addSvgIconInNamespace(theme, name, this.getFilePath(name, theme));
          });

          this.registered.add(name);
          return super.getNamedSvgIcon(name, namespace);
        }
        return throwError(err);
      })
    );
  }

  protected getFilePath(iconName: string, theme: string): SafeResourceUrl {
    const path = `${this.options.svgFilesBasePath}${iconName}/${theme}.svg`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }
}

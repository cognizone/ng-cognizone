import { InjectionToken } from '@angular/core';

export enum MaterialTheme {
  BASELINE = 'baseline',
  OUTLINE = 'outline',
  ROUND = 'round',
  SHARP = 'sharp',
  TWO_TONE = 'twotone',
}

export interface CognizoneMaterialIconsOptions {
  mainTheme?: MaterialTheme;
  otherThemes?: string[];
  svgFilesBasePath?: string;
}

export const DEFAULT_COGNIZONE_MATERIAL_ICONS_OPTIONS: Required<CognizoneMaterialIconsOptions> = {
  mainTheme: MaterialTheme.OUTLINE,
  otherThemes: [],
  svgFilesBasePath: `assets/material-icons/`,
};

export const COGNIZONE_MATERIAL_ICONS_OPTIONS_TOKEN = new InjectionToken<CognizoneMaterialIconsOptions>('COGNIZONE_MATERIAL_ICONS_OPTIONS');

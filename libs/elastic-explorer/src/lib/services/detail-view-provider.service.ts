import { InjectionToken, Type } from '@angular/core';

import { FullModel } from '../models/full-model';

export interface DetailViewProvider {
  label: string;
  component: Type<unknown>;
  shouldShow(model: FullModel): boolean;
}

export interface DetailViewContext {
  model: FullModel;
}

export const DETAIL_VIEW_PROVIDER_TOKEN = new InjectionToken<DetailViewProvider[]>('DetailViewProvider');
export const DETAIL_VIEW_CONTEXT_TOKEN = new InjectionToken<DetailViewContext>('DetailViewContext');

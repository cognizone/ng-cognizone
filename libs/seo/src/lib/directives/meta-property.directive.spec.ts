/* eslint-disable @typescript-eslint/no-explicit-any */
import { DOCUMENT } from '@angular/common';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { MetaIds } from '../models';
import { MetaPropertyDirective, MetaPropertyPartDirective } from './meta-property.directive';

describe('MetaPropertyDirective', () => {
  const createDirective = createDirectiveFactory({
    directive: MetaPropertyDirective,
    imports: [MetaPropertyDirective, MetaPropertyPartDirective],
    declareDirective: false,
  });

  it(`should exist`, () => {
    const spectator = createDirective(`<div czMetaProperty="${MetaIds.DESCRIPTION}"></div>`);
    expect(spectator.directive).toBeTruthy();
  });

  it(`should build a simple description`, () => {
    const spectator = createDirective(`<div czMetaProperty="${MetaIds.DESCRIPTION}">Hello There</div>`);
    checkContentOfUniqueMetaTagWithName(MetaIds.DESCRIPTION, 'Hello There', spectator);
  });

  it(`should build a complex description`, () => {
    const spectator = createDirective(`
      <div czMetaProperty="${MetaIds.DESCRIPTION}" czMetaPropertySubValuesSeparator=": ">
        <div czMetaPropertyPart>Hello</div>
        <div czMetaPropertyPart>World</div>
      </div>
      <div czMetaProperty="${MetaIds.DESCRIPTION}" czMetaPropertySubValuesSeparator=" - ">
        <div czMetaPropertyPart>How are</div>
        <div czMetaPropertyPart>you?</div>
      </div>
      `);
    checkContentOfUniqueMetaTagWithName(MetaIds.DESCRIPTION, 'Hello: World,How are - you?', spectator);
  });

  function checkContentOfUniqueMetaTagWithName(
    name: string,
    expectedContent: string,
    spectator: SpectatorDirective<MetaPropertyDirective, unknown>
  ): void {
    const doc = spectator.inject(DOCUMENT);
    const metas = doc.querySelectorAll(`meta[name='${name}']`);
    expect(metas.length).toBe(1);
    expect(metas[0].getAttribute('content')).toBe(expectedContent);
  }
});

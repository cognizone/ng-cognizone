import { Command, Flags } from '@oclif/core';

import { JsonService } from '../services';

export default class SortAp extends Command {
  static description: string = 'create an angular library';

  static examples: string[] = [`$ cz-cli create-ng-library`];

  static flags = {
    help: Flags.help({ char: 'h' }),
  };

  static args = [
    {
      name: 'path',
      description: 'path to the raw application profile json file',
      required: true,
    },
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(SortAp);
    const { path } = args;
    let ap = JsonService.readJsonSync(path) as any;
    ap = this.getSortedObject(ap, ['uri', 'imports'], 'uri');
    Object.keys(ap)
      .filter(key => typeof ap[key] === 'object' && !Array.isArray(ap[key]))
      .forEach(typeKey => {
        ap[typeKey] = this.getSortedObject(ap[typeKey], ['constraints'], 'uri');
        Object.keys(ap[typeKey])
          .filter(key => key !== 'constraints')
          .forEach(attributeKey => {
            ap[typeKey][attributeKey] = this.getSortedObject(ap[typeKey][attributeKey], [
              'maxCardinality',
              'minCardinality',
              'range',
              'uri',
            ]);
          });
      });
    JsonService.writeJsonSync(path, ap);
  }

  private getSortedObject<T extends {}>(obj: any, priorityKeys: string[], sortBy?: string): T {
    const newObj = {} as any;
    (Object.keys(obj) as any[])
      .sort((a, b) => {
        const aIndex = priorityKeys.indexOf(a);
        const bIndex = priorityKeys.indexOf(b);
        const diff = bIndex - aIndex;
        if (diff !== 0) return diff;
        const compareA = sortBy ? obj[a][sortBy] ?? a : a;
        const compareB = sortBy ? obj[b][sortBy] ?? b : b;
        return compareA.localeCompare(compareB);
      })
      .forEach(key => {
        newObj[key] = obj[key];
      });
    return newObj;
  }
}

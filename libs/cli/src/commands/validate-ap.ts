import { ApplicationProfileRaw } from '@cognizone/application-profile';
import { manyToArray } from '@cognizone/model-utils';
import { Command, Flags, Interfaces } from '@oclif/core';
import * as chalk from 'chalk';

import { JsonService } from '../services';

export default class ValidateAp extends Command {
  static description: string = 'run some validations checks on given application profile(s)';

  static examples: string[] = [`$ cz-cli validate-ap path/to/ap.json`];

  static flags = {
    help: Flags.help({ char: 'h' }),
  };

  static args: Interfaces.ArgInput = [
    {
      name: 'path',
      description: 'path to the raw application profile json file',
      required: true,
    },
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(ValidateAp);
    const { path } = args;
    const ap = JsonService.readJsonSync(path) as ApplicationProfileRaw;
    const fails: ValidationFail[] = [];

    fails.push(...this.checkClassesReferences(ap));

    if (fails.length > 0) {
      console.error(chalk.red(`Given Ap didn't pass validation`));
      fails.forEach(fail => {
        console.error(chalk.red(fail.message));
      });
      this.exit(1);
    }

    console.log(chalk.green('Ap is valid'));
  }

  private checkClassesReferences(ap: ApplicationProfileRaw): ValidationFail[] {
    const fails: ValidationFail[] = [];
    const classesToCheck: CheckedClass[] = Object.keys(ap)
      .filter(key => key !== 'uri')
      .map(classId => ({ classId, referencedIn: 'root' }));
    const processedClasses = new Set();

    while (classesToCheck.length > 0) {
      const { classId, referencedIn } = classesToCheck.splice(0, 1)[0] as CheckedClass;
      if (processedClasses.has(classId)) continue;
      processedClasses.add(classId);
      const typeProfile = ap[classId];
      if (typeof typeProfile === 'string') {
        continue;
      }
      if (!typeProfile) {
        fails.push({
          message: `Could not find class ${classId} referenced in ${referencedIn}`,
        });
        continue;
      }

      const parents = manyToArray(typeProfile?.constraints?.subClassOf ?? []).map<CheckedClass>(parentClass => ({
        classId: parentClass,
        referencedIn: `subclass ${classId}`,
      }));
      classesToCheck.push(...manyToArray(parents));

      (Object.entries(typeProfile) as [string, any][])
        .filter(([key]) => key !== 'constraints')
        .forEach(([attributeKey, attributeProfile]) => {
          const attributeClassId: string[] = manyToArray(attributeProfile.range?.classId);
          const attributeClassIds: string[] = attributeProfile.range?.or?.classId ?? [];
          const toAdd = [...attributeClassId, ...attributeClassIds]
            .filter(v => v != null)
            .map(id => ({ classId: id, referencedIn: `${classId}:${attributeKey}` }));
          classesToCheck.push(...toAdd);
        });
    }
    return fails;
  }
}

interface ValidationFail {
  message: string;
}

interface CheckedClass {
  classId: string;
  referencedIn: string;
}

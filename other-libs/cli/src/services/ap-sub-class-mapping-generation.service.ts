import { JsonService } from './json.service';

// tslint:disable:no-console

export class SubClassMappingGenerationService {
  constructor(private options: SubClassMappingGenerationOptions) {}

  async process(): Promise<SubClassOfMappings> {
    const aps = this.options.apPaths.map(path => JsonService.readJsonSync<ApRaw>(path, { strict: true }));
    const result: SubClassOfMappings = {};

    aps.forEach(ap =>
      Object.entries(ap).forEach(([classId, typeProfile]) => {
        if (!isTypeProfileRaw(typeProfile)) return;
        const { subClassOf } = typeProfile.constraints;
        if (!subClassOf) return;
        result[classId] = subClassOf[0];
      })
    );

    JsonService.writeJsonSync(this.options.targetPath, result);

    return result;
  }
}

export interface SubClassMappingGenerationOptions {
  apPaths: string[];
  targetPath: string;
}

interface ApRaw {
  uri: string;
  [classId: string]: TypeProfileRaw | string;
}

interface TypeProfileRaw {
  constraints: {
    subClassOf?: string[];
  };
}

export interface SubClassOfMappings {
  [classId: string]: string;
}

function isTypeProfileRaw(o: unknown): o is TypeProfileRaw {
  return typeof o === 'object' && o != null && 'constraints' in o;
}

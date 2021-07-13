import { MicroAttributeMapper } from './micro-attribute-mapper';

export class DefaultMapper implements MicroAttributeMapper<unknown, unknown> {
  priority: number = -1000;

  supportDeserialize(dataType: string): boolean {
    return true;
  }

  deserialize(dataType: string, value: unknown): unknown {
    return value;
  }

  supportSerialize(dataType: string): boolean {
    return true;
  }

  serialize(dataType: string, value: unknown): unknown {
    return value;
  }
}

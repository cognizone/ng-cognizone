import { MicroAttributeMapper } from './micro-attribute-mapper';

export class DefaultMapper implements MicroAttributeMapper<unknown, unknown> {
  priority = -1000;

  supportDeserialize(): boolean {
    return true;
  }

  deserialize(dataType: string, value: unknown): unknown {
    return value;
  }

  supportSerialize(): boolean {
    return true;
  }

  serialize(dataType: string, value: unknown): unknown {
    return value;
  }
}

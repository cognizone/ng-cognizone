import { ApplicationProfile } from '@cognizone/application-profile';
import { Command, Flags } from '@oclif/core';
import * as chalk from 'chalk';
import { cosmiconfigSync } from 'cosmiconfig';
import produce from 'immer';

import { JsonService } from '../services';
import { ApFetchService, ApiGetOptions, ElasticFetchOptions } from '../services/ap-fetch.service';
import { ApGenerationOptions, ApInterfacesGenerationService } from '../services/ap-interfaces-generation.service';
import { ApRawGenerationOptions, ApRawInterfacesGenerationService } from '../services/ap-raw-interfaces-generation.service';
import {
  SubClassMappingGenerationOptions,
  SubClassMappingGenerationService,
  SubClassOfMappings,
} from '../services/ap-sub-class-mapping-generation.service';

export default class CreateApTypes extends Command {
  static description: string = 'create types from an application profile';

  static examples: string[] = [`$ cz-cli create-ap-types`];

  static flags = {
    help: Flags.help({ char: 'h' }),
    init: Flags.boolean({}),
    verbose: Flags.boolean({}),
    apName: Flags.string({ multiple: true }),
  };

  static args = [];

  private readonly moduleName: string = 'ap-generation';

  async run(): Promise<void> {
    const { flags } = await this.parse(CreateApTypes);
    if (flags.init) {
      this.initConfig();
      return;
    }
    const config = cosmiconfigSync(this.moduleName).search()?.config as ApGenerationConfigs | undefined;
    if (!config) {
      this.error(`Failed to find a config file, did you run "cz-cli create-ap-types --init" already?`, { exit: 1 });
    }
    const apName = flags.apName ?? Object.keys(config);

    for (const name of apName) {
      const mConfig = { ...config[name], verbose: flags.verbose };
      if (!mConfig) {
        return this.error(`"${name}" is not a known ap generation config name`, { exit: 1 });
      }
      const subClassOfMappings = await this.generateSubClassOfMappings(mConfig);
      await this.generateAp(mConfig, subClassOfMappings);
    }
  }

  private initConfig(): void {
    JsonService.writeJsonSync(`.${this.moduleName}rc.json`, defaultConfig);
  }

  private async generateAp(config: ApGenerationConfig, subClassOfMappings: SubClassOfMappings): Promise<void> {
    if (!config.apFetchOptions) {
      return;
    }
    this.log(`Processing ${config.name}`);
    try {
      let ap: ApplicationProfile;

      switch (config.apFetchOptions.type) {
        case 'apiGet':
          this.log(`Fetching Ap from api ${config.apFetchOptions.url}`);
          ap = await ApFetchService.getFromUrl(config.apFetchOptions);
          break;
        case 'elastic':
          this.log(`Fetching Ap from elastic ${config.apFetchOptions.url}`);
          ap = await ApFetchService.fetchFromElastic(config.apFetchOptions);
          break;
        case 'file':
          this.log(`Fetching Ap from file ${config.apFetchOptions.path}`);
          ap = await ApFetchService.getFromFile(config.apFetchOptions.path);
          break;
        default:
          return this.error(`apFetchOptions.type '${(config.apFetchOptions as ApFetchOptions).type}' is not handled`, { exit: 1 });
      }
      ap = this.augmentAp(ap, subClassOfMappings);
      if (config.generationOptions) {
        const service = new ApInterfacesGenerationService({ ap, ...config.generationOptions });
        await service.process();
      }
      if (config.rawGenerationOptions) {
        const rawService = new ApRawInterfacesGenerationService({ ap, ...config.rawGenerationOptions });
        await rawService.process();
      }
      this.log(`Done generating interfaces for ${config.name}`);
    } catch (err) {
      this.error(`Failed to generate interfaces for ${config.name}`, { exit: false });
      // TODO log error like these when in verbose mode
      // console.error(err);
      this.error(err as Error, { exit: false });
    }
  }

  private async generateSubClassOfMappings(config: ApGenerationConfig): Promise<SubClassOfMappings> {
    if (!config.subClassMappingGenerationOptions) return {};
    this.log(chalk.blue(`Processing '${config.name}'`));
    const service = new SubClassMappingGenerationService(config.subClassMappingGenerationOptions);
    return service.process();
  }

  private augmentAp(ap: ApplicationProfile, subClassOfMappings: SubClassOfMappings): ApplicationProfile {
    return produce(ap, draft => {
      Object.entries(subClassOfMappings).forEach(([classId, parent]) => {
        draft.types[classId].rules.push({
          name: 'subClassOf',
          value: parent,
        });
      });
    });
  }
}

type FlagsModel = {
  help: void;
  init: boolean;
  verbose: boolean;
  apName?: string[];
};

const defaultConfig: ApGenerationConfigs = {
  'casemates-ch-local': {
    name: 'casemates-ch-local',
    generationOptions: {
      targetPath: 'src/app/core/models/casemates-ch-local.ap.ts',
    },
    apFetchOptions: {
      type: 'file',
      path: 'node_modules/@cognizone/cz-cli/assets/ap/ch-casemates.ap.json',
    },
  },
  'casemates-ch-elastic': {
    name: 'casemates-ch-elastic',
    generationOptions: {
      targetPath: 'src/app/core/models/casemates-ch-elastic.ap.ts',
    },
    apFetchOptions: {
      type: 'elastic',
      url: 'http://ch-casemates-dev-elastic.cz-aws.net:9200',
      index: 'config',
      id: 'casemates-ap.json',
    },
  },
  'legipro-ch-api': {
    name: 'legipro-ch-api',
    generationOptions: {
      targetPath: 'src/app/core/models/legipro-ch-api.ap.ts',
    },
    apFetchOptions: {
      type: 'apiGet',
      url: 'http://localhost:8080/legipro/api/application-profile/draft',
      headers: {
        Authorization: 'Basic dGVjaG5pY2FsX2FkbWluOnRlc3Q=',
      },
    },
  },
};

interface ApGenerationConfigs {
  [key: string]: ApGenerationConfig;
}

interface ApGenerationConfig {
  name: string;
  generationOptions?: Omit<ApGenerationOptions, 'ap'>;
  rawGenerationOptions?: Omit<ApRawGenerationOptions, 'ap'>;
  subClassMappingGenerationOptions?: SubClassMappingGenerationOptions;
  apFetchOptions?: ApFetchOptions;
}

type ApFetchOptions =
  | ({
      type: 'elastic';
    } & ElasticFetchOptions)
  | ({
      type: 'apiGet';
    } & ApiGetOptions)
  | {
      type: 'file';
      path: string;
    };

import { Environment } from './environment-model';

export const environment: Environment = {
  production: true,
  features: {
    architecture: {
      component: true,
      forms: false,
    },
    ngCore: true,
    ngYasgui: true,
  },
};

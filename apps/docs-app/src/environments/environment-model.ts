export interface Environment {
  production: boolean;
  features: {
    architecture: {
      component: boolean;
      forms: boolean;
    };
    ngCore: boolean;
    ngYasgui: boolean;
  };
}

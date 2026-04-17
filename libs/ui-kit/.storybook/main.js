import rootMain from '../../../.storybook/main.js';

export default {
  ...rootMain,

  stories: [...(rootMain.stories ?? []), '../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [...rootMain.addons],
  webpackFinal: async (config, { configType }) => {
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    return config;
  },
};

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const fs = require('fs');

const baseLibsPath = '../../libs';

const libsBlacklist = ['cli', 'legi-styles', 'eslint-config', 'prettier-config', 'tslint-config'];
const libs = fs.readdirSync(baseLibsPath).filter(lib => !libsBlacklist.includes(lib));
const typedocPlugins = libs.map(lib => {
  const folder = fs.readdirSync(`${baseLibsPath}/${lib}`);
  const entryPoints = folder.map(sub => `${baseLibsPath}/${lib}/${sub}/index.ts`).filter(path => fs.existsSync(path));
  return [
    'docusaurus-plugin-typedoc',
    {
      id: `typedoc-${lib}`,
      entryPoints,
      tsconfig: `../../libs/${lib}/tsconfig.lib.json`,
      out: `libraries/${lib}/api`,
      exclude: '**/*+(.spec|.e2e|.stories).ts',
    },
  ];
});

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: 'Ng-Cognizone',
    tagline: "Open source hub for Cognizone's work in the frontend, having both guides and documentation for libraries",
    url: 'https://cognizone.github.io',
    baseUrl: '/ng-cognizone/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/logo.png',
    organizationName: 'cognizone',
    projectName: 'ng-cognizone',
    plugins: [...typedocPlugins],
    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve('./sidebars.js'),
            editUrl: 'https://github.com/cognizone/ng-cognizone/edit/main/website/',
          },
          blog: {
            showReadingTime: true,
            editUrl: 'https://github.com/cognizone/ng-cognizone/edit/main/website/blog/',
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: 'Ng Cognizone',
          logo: {
            alt: 'Cognizone',
            src: 'img/logo.png',
          },
          items: [
            {
              type: 'doc',
              docId: 'libraries/index',
              position: 'left',
              label: 'Libraries',
            },
            // { to: '/blog', label: 'Blog', position: 'left' },
            {
              href: 'https://github.com/cognizone/ng-cognizone',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Docs',
              items: [
                {
                  label: 'Tutorial',
                  to: '/docs/libraries/index',
                },
              ],
            },
            {
              title: 'More',
              items: [
                // {
                //   label: 'Blog',
                //   to: '/blog',
                // },
                {
                  label: 'GitHub',
                  href: 'https://github.com/cognizone/ng-cognizone',
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} Ng Cognizone, Cognizone Built with Docusaurus.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  }
);

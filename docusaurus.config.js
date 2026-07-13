// @ts-check
// Docusaurus configuration. See https://docusaurus.io/docs/api/docusaurus-config
const {themes} = require('prism-react-renderer');
const simplePlantUML = require('@akebifiky/remark-simple-plantuml');

// PlantUML rendering server. Diagrams are encoded at build time; the reader's
// browser fetches the rendered SVG from this server at view time. Point this at
// a self-hosted PlantUML/Kroki server to remove the public dependency.
const PLANTUML_SERVER = 'https://www.plantuml.com/plantuml/svg';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Architecture for Platform Engineers',
  tagline: 'Diagram-first white papers on system design — high-level, workflow, and tradeoffs',
  favicon: 'img/favicon.svg',

  // Production URL and base path for GitHub Pages (project site).
  url: 'https://duychu.github.io',
  baseUrl: '/architecture-for-platform-engineer/',
  trailingSlash: false,

  // GitHub Pages deployment config.
  organizationName: 'duychu',
  projectName: 'architecture-for-platform-engineer',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Enable Mermaid diagrams rendered natively by the theme.
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // serve the white papers at the site root
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/duychu/architecture-for-platform-engineer/edit/main/',
          // PlantUML: rewrite ```plantuml fences into <img> tags served by PLANTUML_SERVER.
          remarkPlugins: [[simplePlantUML, {baseUrl: PLANTUML_SERVER}]],
          exclude: ['**/_TEMPLATE.md'], // template is reference-only, not a published page
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Architecture for Platform Engineers',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'papersSidebar',
            position: 'left',
            label: 'White Papers',
          },
          {
            href: 'https://github.com/duychu/architecture-for-platform-engineer',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Papers',
            items: [
              {label: 'Start here', to: '/'},
              {
                label: 'Internal Developer Platform',
                to: '/platform-engineering/internal-developer-platform',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/duychu/architecture-for-platform-engineer',
              },
            ],
          },
        ],
        copyright: `Architecture for Platform Engineers. Built with Docusaurus.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
      },
      mermaid: {
        theme: {light: 'neutral', dark: 'dark'},
      },
    }),
};

module.exports = config;

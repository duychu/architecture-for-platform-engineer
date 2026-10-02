// @ts-check
// Docusaurus configuration. See https://docusaurus.io/docs/api/docusaurus-config
const {themes} = require('prism-react-renderer');
const simplePlantUML = require('@akebifiky/remark-simple-plantuml');

// PlantUML rendering server. Diagrams are encoded at build time; the reader's
// browser fetches the rendered SVG from this server at view time. Point this at
// a self-hosted PlantUML/Kroki server to remove the public dependency.
const PLANTUML_SERVER = 'https://www.plantuml.com/plantuml/svg';

const GITHUB_REPO = 'https://github.com/duychu/architecture-for-platform-engineer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Platform Engineering Handbook',
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

  // IBM Plex Sans + Mono from Google Fonts (the Carbon type stack).
  stylesheets: [
    {href: 'https://fonts.googleapis.com', rel: 'preconnect'},
    {href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: 'anonymous'},
    {
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@300;400;600;700&display=swap',
      rel: 'stylesheet',
    },
  ],

  // Enable Mermaid diagrams rendered natively by the theme.
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: [
    '@docusaurus/theme-mermaid',
    // Local, offline search — renders the navbar search box and indexes the docs.
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        docsRouteBasePath: 'docs',
        blogRouteBasePath: '/blog',
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/docs', // papers live under /docs; the React homepage owns /
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: `${GITHUB_REPO}/edit/main/`,
          // PlantUML: rewrite ```plantuml fences into <img> tags served by PLANTUML_SERVER.
          remarkPlugins: [[simplePlantUML, {baseUrl: PLANTUML_SERVER}]],
          exclude: ['**/_TEMPLATE.md'], // template is reference-only, not a published page
        },
        blog: {
          routeBasePath: '/blog',
          editUrl: `${GITHUB_REPO}/edit/main/`,
          blogTitle: 'The platform engineering blog',
          blogDescription: 'Notes from building the paved road — field reports and decisions.',
          blogSidebarTitle: 'Archive',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          postsPerPage: 20, // keep all posts on one page so month filtering is complete
          archiveBasePath: null, // remove the default (blue-banner) archive page
          feedOptions: {type: ['rss', 'atom'], xslt: true},
        },
        theme: {
          // Carbon token bridge first, then the component styling that consumes it.
          customCss: [
            require.resolve('./src/css/carbon-tokens.css'),
            require.resolve('./src/css/custom.css'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        // Dark-first to match the Helix / Carbon g100 design. Visitors can still
        // toggle to the light (Carbon "white") theme; we don't auto-follow the OS
        // so first paint reliably matches the intended dark design.
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
      },
      // Collapsible left sidebar (Carbon-style hide/show control).
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      navbar: {
        title: 'Platform Engineering Handbook',
        logo: {
          alt: 'Platform Engineering Handbook',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'papersSidebar',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          // Explicit search item controls its position (before version + GitHub).
          {type: 'search', position: 'right'},
          {
            type: 'dropdown',
            label: 'v1.0',
            position: 'right',
            items: [{label: 'v1.0 · latest', href: `${GITHUB_REPO}/releases`}],
          },
          {
            href: GITHUB_REPO,
            position: 'right',
            className: 'navbar-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {label: 'Start here', to: '/docs'},
              {
                label: 'Internal Developer Platform',
                to: '/docs/platform-engineering/internal-developer-platform',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {label: 'Repository', href: GITHUB_REPO},
              {label: 'Issues', href: `${GITHUB_REPO}/issues`},
            ],
          },
          {
            title: 'Community',
            items: [
              {label: 'Contributing', href: `${GITHUB_REPO}/blob/main/README.md`},
              {label: 'Changelog', href: `${GITHUB_REPO}/commits/main`},
            ],
          },
        ],
        copyright:
          '© 2026 Platform Engineering Handbook · Built with Docusaurus and the IBM Carbon design system.',
      },
      prism: {
        theme: themes.oneLight,
        darkTheme: themes.oneDark,
        additionalLanguages: ['bash', 'yaml', 'json'],
      },
      mermaid: {
        theme: {light: 'neutral', dark: 'dark'},
      },
    }),
};

module.exports = config;

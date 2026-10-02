// @ts-check
// Sidebar for the white-paper collection. Grouped by theme so the series can grow
// without restructuring. Add new papers under the relevant category.

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  papersSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Platform / IDP / Golden Paths',
      collapsed: false,
      items: ['platform-engineering/internal-developer-platform'],
    },
  ],
};

module.exports = sidebars;

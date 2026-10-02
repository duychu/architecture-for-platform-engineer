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
    {
      type: 'category',
      label: 'Secrets Management (Vault / OpenBao)',
      collapsed: false,
      link: {type: 'doc', id: 'secrets-management/overview'},
      items: [
        'secrets-management/how-vault-works',
        'secrets-management/auth-methods-cloud',
        'secrets-management/integration-patterns',
        'secrets-management/secrets-engines-kv2',
        'secrets-management/secrets-engines-database',
        'secrets-management/policies-and-delivery',
      ],
    },
  ],
};

module.exports = sidebars;

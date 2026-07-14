import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8h9M8.5 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// High-level themes of the series. `live` ones link to a paper; the rest are planned.
const TILES = [
  {
    title: 'Internal Developer Platform',
    desc: 'The planes model, golden paths, and the tradeoffs behind an IDP developers actually adopt.',
    cta: 'Read the paper',
    to: '/docs/platform-engineering/internal-developer-platform',
    live: true,
  },
  {
    title: 'Reliability & Observability',
    desc: 'SLI/SLO/SLA, error budgets, and resilience patterns — retries, circuit breakers, bulkheads.',
    cta: 'Planned',
    to: '/docs',
  },
  {
    title: 'Scalability & Data',
    desc: 'Load balancing, statelessness, caching, sharding, replication, and consistency tradeoffs.',
    cta: 'Planned',
    to: '/docs',
  },
  {
    title: 'Delivery: K8s, CI/CD, GitOps',
    desc: 'Progressive delivery, pipelines, and GitOps flow for shipping safely and often.',
    cta: 'Planned',
    to: '/docs',
  },
  {
    title: 'The white-paper template',
    desc: 'The reusable, diagram-first spine every paper follows — copy it to write a new one.',
    cta: 'How papers are built',
    to: '/docs',
  },
  {
    title: 'How to read these papers',
    desc: 'A 10-minute path through each paper — big picture, workflow, tradeoffs, critical questions.',
    cta: 'Start here',
    to: '/docs',
  },
];

const POPULAR = [
  {
    num: '01',
    title: 'Anatomy of an Internal Developer Platform',
    crumb: 'Platform / IDP',
    to: '/docs/platform-engineering/internal-developer-platform',
  },
  {num: '02', title: 'How to read these papers', crumb: 'Start here', to: '/docs'},
  {
    num: '03',
    title: 'Do you even need an IDP yet?',
    crumb: 'Platform / IDP',
    to: '/docs/platform-engineering/internal-developer-platform#do-you-even-need-an-idp-yet',
  },
];

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.badge}>
        <span className={styles.dot} />
        Vendor-neutral · diagram-first
      </div>
      <h1 className={styles.heroTitle}>
        Design systems, the platform-engineer way.
      </h1>
      <p className={styles.heroSubtitle}>
        A growing set of diagram-led white papers on system design — the concepts, boundaries,
        and architectural patterns platform engineers reason about. High-level and
        vendor-neutral: read the picture, understand the workflow, and challenge the tradeoffs.
      </p>

      <div className={styles.ctaRow}>
        <Link
          className={styles.ctaPrimary}
          to="/docs/platform-engineering/internal-developer-platform">
          Read the flagship paper <Arrow />
        </Link>
        <Link className={styles.ctaSecondary} to="/docs">
          Start here <Arrow />
        </Link>
      </div>

      <div className={styles.snippet}>
        <div className={styles.snippetHeader}>
          <span>Preview the site locally</span>
        </div>
        <pre className={styles.snippetBody}>
          <code>{`# clone, install, and serve with hot reload
git clone ` + `https://github.com/duychu/architecture-for-platform-engineer
npm install && npm start`}</code>
        </pre>
      </div>
    </section>
  );
}

function Tiles() {
  return (
    <section className={styles.section}>
      <div className={styles.tileGrid}>
        {TILES.map((t) => (
          <Link key={t.title} to={t.to} className={styles.tile}>
            <span className={styles.tileTitle}>{t.title}</span>
            <span className={styles.tileDesc}>{t.desc}</span>
            <span className={styles.tileCta}>
              {t.cta} <Arrow />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Popular() {
  return (
    <section className={styles.section}>
      <h2 className={styles.popularHeading}>Popular pages</h2>
      <p className={styles.popularSub}>Where most readers start.</p>
      <div className={styles.popularList}>
        {POPULAR.map((p) => (
          <Link key={p.num} to={p.to} className={styles.popularItem}>
            <span className={styles.popularNum}>{p.num}</span>
            <span className={styles.popularTitle}>{p.title}</span>
            <span className={styles.popularCrumb}>{p.crumb}</span>
            <Arrow />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}>
      <main className={styles.page}>
        <Hero />
        <Tiles />
        <Popular />
      </main>
    </Layout>
  );
}

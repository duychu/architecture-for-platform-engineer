/**
 * Custom blog list page — reproduces the "Helix Docs" blog design:
 * a left Archive timeline, a Featured hero card, and a post grid.
 * Overrides @theme/BlogListPage; individual post pages keep the default theme.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SearchMetadata from '@theme/SearchMetadata';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import styles from './styles.module.css';

function meta(item) {
  return item.content.metadata;
}

function readLabel(m) {
  const mins = m.readingTime ? Math.max(1, Math.ceil(m.readingTime)) : null;
  return mins ? `${mins} min read` : null;
}

function authorName(m) {
  return (m.authors && m.authors[0] && m.authors[0].name) || 'Platform Team';
}

function Tag({label}) {
  return <span className={styles.tag}>{label}</span>;
}

function BlogArt() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <rect x="10" y="10" width="100" height="100" rx="14" fill="var(--cds-interactive)" fillOpacity="0.12" />
      <path d="M60 28 90 44 60 60 30 44 60 28Z" fill="var(--cds-interactive)" fillOpacity="0.9" />
      <path d="M30 60 60 76 90 60" stroke="var(--cds-interactive)" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 76 60 92 90 76" stroke="var(--cds-interactive)" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Featured({item}) {
  const m = meta(item);
  const tag = m.tags && m.tags[0];
  return (
    <Link to={m.permalink} className={styles.featured}>
      <div className={styles.featuredBody}>
        <div className={styles.featuredTagRow}>
          {tag && <Tag label={tag.label} />}
          <span className={styles.featuredFlag}>Featured</span>
        </div>
        <h2 className={styles.featuredTitle}>{m.title}</h2>
        {m.description && <p className={styles.excerpt}>{m.description}</p>}
        <div className={styles.author}>
          <span className={styles.avatar}>{authorName(m).charAt(0)}</span>
          <div>
            <div className={styles.authorName}>{authorName(m)}</div>
            <div className={styles.authorMeta}>
              {m.formattedDate}
              {readLabel(m) ? ` · ${readLabel(m)}` : ''}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.featuredArt}>
        <BlogArt />
      </div>
    </Link>
  );
}

function PostCard({item}) {
  const m = meta(item);
  const tag = m.tags && m.tags[0];
  return (
    <Link to={m.permalink} className={styles.card}>
      {tag && <Tag label={tag.label} />}
      <h3 className={styles.cardTitle}>{m.title}</h3>
      {m.description && <p className={styles.excerpt}>{m.description}</p>}
      <div className={styles.cardMeta}>
        <span className={styles.cardAuthor}>{authorName(m)}</span>
        <span>·</span>
        <span>{m.formattedDate}</span>
        {readLabel(m) && (
          <>
            <span>·</span>
            <span>{readLabel(m)}</span>
          </>
        )}
      </div>
    </Link>
  );
}

function Timeline({items}) {
  // Group by year (posts arrive newest-first).
  const groups = [];
  items.forEach((item) => {
    const m = meta(item);
    const year = new Date(m.date).getFullYear();
    let g = groups.find((x) => x.year === year);
    if (!g) {
      g = {year, posts: []};
      groups.push(g);
    }
    g.posts.push(m);
  });

  return (
    <aside className={styles.timeline}>
      <div className={styles.timelineTitle}>Archive</div>
      {groups.map((g) => (
        <div key={g.year} className={styles.timelineGroup}>
          <div className={styles.timelineYear}>
            {g.year}
            <span className={styles.timelineCount}>{g.posts.length}</span>
          </div>
          <div className={styles.timelineTrack}>
            {g.posts.map((m) => (
              <Link key={m.permalink} to={m.permalink} className={styles.timelineItem}>
                <span className={styles.dot} />
                <span className={styles.timelineLabel}>{m.title}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}

function BlogListPageMetadata(props) {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

export default function BlogListPage(props) {
  const {metadata, items} = props;
  const [featured, ...rest] = items;
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <Layout>
        <main className={styles.page}>
          <header className={styles.header}>
            <div className={styles.eyebrow}>The platform engineering blog</div>
            <h1 className={styles.h1}>{metadata.blogTitle}</h1>
            {metadata.blogDescription && (
              <p className={styles.lede}>{metadata.blogDescription}</p>
            )}
          </header>

          <div className={styles.layout}>
            <Timeline items={items} />
            <div className={styles.content}>
              {featured && <Featured item={featured} />}
              {rest.length > 0 && (
                <div className={styles.grid}>
                  {rest.map((item) => (
                    <PostCard key={meta(item).permalink} item={item} />
                  ))}
                </div>
              )}
              <BlogListPaginator metadata={metadata} />
            </div>
          </div>
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}

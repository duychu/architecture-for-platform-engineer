/**
 * Custom blog layout — a docs-style shell where the Archive timeline is a
 * FLUSH-LEFT full-height panel (like the docs sidebar). The main content is
 * centered; blog POST pages also get a right-hand "On this page" TOC.
 * Overrides @theme/BlogLayout.
 */
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import styles from './styles.module.css';

export default function BlogLayout(props) {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  const hasToc = Boolean(toc);
  return (
    <Layout {...layoutProps}>
      <div className={styles.shell}>
        {hasSidebar && <BlogSidebar sidebar={sidebar} />}
        <main className={styles.main}>
          <div className={clsx(styles.article, hasToc && styles.articleWithToc)}>
            {children}
          </div>
        </main>
        {toc && <div className={styles.toc}>{toc}</div>}
      </div>
    </Layout>
  );
}

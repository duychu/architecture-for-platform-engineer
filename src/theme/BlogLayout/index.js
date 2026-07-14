/**
 * Custom blog layout — a docs-style shell where the Archive timeline is a
 * FLUSH-LEFT full-height panel (like the docs sidebar), not a centered column.
 * Used by both the blog list and post pages. Overrides @theme/BlogLayout.
 */
import React from 'react';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import styles from './styles.module.css';

export default function BlogLayout(props) {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  return (
    <Layout {...layoutProps}>
      <div className={styles.shell}>
        {hasSidebar && <BlogSidebar sidebar={sidebar} />}
        <main className={styles.main}>
          <div className={styles.article}>{children}</div>
        </main>
        {toc && <div className={styles.toc}>{toc}</div>}
      </div>
    </Layout>
  );
}

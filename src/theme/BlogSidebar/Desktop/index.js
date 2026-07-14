/**
 * Custom desktop blog sidebar — the "Archive" timeline from the Helix design:
 * an "All posts" node plus one node per month, each with a post count and a
 * ring dot on a vertical line. Used by both the blog list and detail pages
 * (via BlogLayout), so they stay identical. Overrides @theme/BlogSidebar/Desktop.
 */
import React, {memo} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useVisibleBlogSidebarItems} from '@docusaurus/plugin-content-blog/client';
import styles from './styles.module.css';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function buildMonths(items) {
  const map = new Map();
  items.forEach((item) => {
    const d = new Date(item.date);
    const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
    if (!map.has(key)) {
      map.set(key, {
        key,
        label: `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`,
        ts: Date.UTC(d.getUTCFullYear(), d.getUTCMonth()),
        permalinks: [],
      });
    }
    map.get(key).permalinks.push(item.permalink);
  });
  // Newest month first.
  return [...map.values()].sort((a, b) => b.ts - a.ts);
}

function Node({to, active, label, count}) {
  return (
    <Link to={to} className={clsx(styles.node, active && styles.active)}>
      <span className={styles.dot} />
      <span className={styles.label}>{label}</span>
      <span className={styles.count}>{count}</span>
    </Link>
  );
}

function BlogSidebarDesktop({sidebar}) {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  const months = buildMonths(items);
  const {pathname, search} = useLocation();
  const blogIndex = useBaseUrl('/blog');

  const onIndex = pathname === blogIndex || pathname === `${blogIndex}/`;
  const selectedMonth = new URLSearchParams(search).get('m'); // e.g. "2026-6"
  const isPostActive = (m) => m.permalinks.some((p) => p === pathname);

  // Month nodes filter the list in place (?m=key) — same layout, filtered content.
  const monthActive = (m) =>
    (onIndex && selectedMonth === m.key) || (!onIndex && isPostActive(m));

  return (
    <aside className={styles.sidebar}>
      <nav className={clsx(styles.timeline, 'thin-scrollbar')} aria-label="Blog archive">
        <div className={styles.title}>{sidebar.title}</div>
        <div className={styles.track}>
          <Node
            to={blogIndex}
            active={onIndex && !selectedMonth}
            label="All posts"
            count={items.length}
          />
          {months.map((m) => (
            <Node
              key={m.key}
              to={`${blogIndex}?m=${m.key}`}
              active={monthActive(m)}
              label={m.label}
              count={m.permalinks.length}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
}

export default memo(BlogSidebarDesktop);

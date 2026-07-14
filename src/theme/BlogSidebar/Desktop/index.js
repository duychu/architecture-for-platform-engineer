/**
 * Custom desktop blog sidebar — the same "Archive" timeline used on the blog
 * list page, so the detail pages are consistent. Overrides
 * @theme/BlogSidebar/Desktop.
 */
import React, {memo} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {
  useVisibleBlogSidebarItems,
  groupBlogSidebarItemsByYear,
} from '@docusaurus/plugin-content-blog/client';
import styles from './styles.module.css';

function BlogSidebarDesktop({sidebar}) {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  const byYear = groupBlogSidebarItemsByYear(items);
  const {pathname} = useLocation();

  return (
    <aside className="col col--3">
      <nav className={clsx(styles.timeline, 'thin-scrollbar')} aria-label="Blog recent posts navigation">
        <div className={styles.timelineTitle}>{sidebar.title}</div>
        {byYear.map(([year, yearItems]) => (
          <div key={year} className={styles.timelineGroup}>
            <div className={styles.timelineYear}>
              {year}
              <span className={styles.timelineCount}>{yearItems.length}</span>
            </div>
            <div className={styles.timelineTrack}>
              {yearItems.map((item) => {
                const active = pathname === item.permalink;
                return (
                  <Link
                    key={item.permalink}
                    to={item.permalink}
                    className={clsx(styles.timelineItem, active && styles.active)}>
                    <span className={styles.dot} />
                    <span className={styles.timelineLabel}>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default memo(BlogSidebarDesktop);

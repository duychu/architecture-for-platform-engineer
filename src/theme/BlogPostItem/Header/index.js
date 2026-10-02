/**
 * Custom blog post header — matches the doc-page "meta row" design:
 * a large title, optional subtitle, then a single meta row
 * (date · ~X min read · By author) with an "Edit this post" link and a
 * divider. Replaces the default date + author-card header.
 * Overrides @theme/BlogPostItem/Header.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import styles from './styles.module.css';

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M11 2.5 13.5 5 5 13.5 2 14l.5-3L11 2.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BlogPostItemHeader() {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {date, readingTime, editUrl, authors, frontMatter} = metadata;
  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const formattedDate = date ? dateTimeFormat.format(new Date(date)) : null;
  const author = authors && authors[0] ? authors[0].name : null;
  const mins =
    typeof readingTime === 'number' ? Math.max(1, Math.ceil(readingTime)) : null;
  const subtitle = frontMatter && frontMatter.description;

  return (
    <header>
      <BlogPostItemHeaderTitle />

      {isBlogPostPage && subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}

      <div className={styles.metaRow}>
        <span>{formattedDate}</span>
        {mins !== null && (
          <>
            <span className={styles.sep}>·</span>
            <span>~{mins} min read</span>
          </>
        )}
        {author && (
          <>
            <span className={styles.sep}>·</span>
            <span>By {author}</span>
          </>
        )}
        {isBlogPostPage && editUrl && (
          <Link to={editUrl} className={styles.editLink}>
            <EditIcon />
            Edit this post
          </Link>
        )}
      </div>
    </header>
  );
}

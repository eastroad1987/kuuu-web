"use client";

import Head from 'next/head';
import { Post } from '@/types/entities';

interface PostSEOProps {
  post: Post & {
    category?: { title: string };
    subcategory?: { title: string };
    author?: { name: string };
  };
  url?: string;
}

export default function PostSEO({ post, url }: PostSEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  const postUrl = url || `${siteUrl}/post/${post.id}`;
  
  // 설명을 요약에서 가져오거나 내용에서 추출
  const description = post.summary || 
    (post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...' : '');
  
  // 썸네일 이미지 URL 처리
  const imageUrl = post.thumbnail ? 
    (post.thumbnail.startsWith('http') ? post.thumbnail : `${siteUrl}${post.thumbnail}`) : 
    `${siteUrl}/default-og-image.jpg`;

  return (
    <Head>
      <title>{post.title} | KUUU Blog</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={[post.category?.title, post.subcategory?.title, post.title].filter(Boolean).join(', ')} />
      <meta name="author" content={post.author?.name || 'KUUU Blog'} />
      <link rel="canonical" href={postUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={postUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={post.title} />
      <meta property="og:site_name" content="KUUU Blog" />
      
      {/* Article specific */}
      {/* <meta property="article:published_time" content={post.published_at.toISOString()} /> */}
      {/* <meta property="article:modified_time" content={post.updated_at?.toISOString() || post.published_at.toISOString()} /> */}
      <meta property="article:author" content={post.author?.name || 'KUUU Blog'} />
      <meta property="article:section" content={post.category?.title || ''} />
      {post.category?.title && <meta property="article:tag" content={post.category.title} />}
      {post.subcategory?.title && <meta property="article:tag" content={post.subcategory.title} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kuuu_blog" />
      <meta name="twitter:creator" content="@kuuu_blog" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: description,
            image: [imageUrl],
            // datePublished: post.published_at.toISOString(),
            // dateModified: post.updated_at?.toISOString() || post.published_at.toISOString(),
            author: {
              '@type': 'Person',
              name: post.author?.name || 'KUUU Blog',
            },
            publisher: {
              '@type': 'Organization',
              name: 'KUUU Blog',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`,
              },
            },
            url: postUrl,
          }),
        }}
      />
    </Head>
  );
}

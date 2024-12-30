interface IMetaData {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const generatorMetadata = ({
  title = '99F',
  description = '콘텐츠 아티스트를 위한 구인구직 플랫폼 99F\n영상 제작 프로젝트를 위한 완벽한 매칭을 99F에서 경험하세요.',
  url = 'https://99-f.com/',
  image = 'https://99-f.com/img_logo.png',
}: IMetaData) => {
  return {
    metadataBase: new URL('http://localhost:3000'),
    title: title,
    description: description,
    keywords: ['99F', '배우', '촬영', '영화', '채용'],
    openGraph: {
      title: title || '99F',
      url: url,
      siteName: '99F',
      description: description,
      locale: 'ko_KR',
      type: 'website',
      images: [
        {
          url: image,
          width: 800,
          height: 400,
          alt: 'About 99F',
          type: 'image/png',
        },
      ],
      article: {
        author: '99f development team',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    twitter: {
      title: title || '99F',
      card: 'summary_large_image',
      creator: '@99f',
    },
    icons: {
      shortcut: 'https://99-f.com/favicon.ico',
    },
    // alternates: {
    //   types: {
    //     'application/rss+xml': 'https://99-f/feed.xml',
    //   },
    // },
  };
};
export default generatorMetadata;

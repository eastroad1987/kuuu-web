import React from 'react';
import Image from 'next/image';

// URL 패턴 정규식
const URL_REGEX = /(https?:\/\/[^\s<>"{}|\\^`[\]]+)/gi;
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|svg)$/i;

/**
 * 텍스트 내의 링크를 감지하고 적절한 컴포넌트로 변환
 */
export function processContentLinks(content: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  // HTML 태그 내부의 URL은 제외하기 위한 간단한 체크
  const htmlTagRegex = /<[^>]*>/g;
  const htmlTags: Array<{start: number, end: number}> = [];
  
  let htmlMatch;
  while ((htmlMatch = htmlTagRegex.exec(content)) !== null) {
    htmlTags.push({
      start: htmlMatch.index,
      end: htmlMatch.index + htmlMatch[0].length
    });
  }

  // URL 찾기
  while ((match = URL_REGEX.exec(content)) !== null) {
    const url = match[0];
    const startIndex = match.index;
    const endIndex = startIndex + url.length;

    // HTML 태그 내부의 URL인지 확인
    const isInsideHtmlTag = htmlTags.some(tag => 
      startIndex >= tag.start && endIndex <= tag.end
    );

    if (isInsideHtmlTag) {
      continue;
    }

    // 이전 텍스트 추가
    if (startIndex > lastIndex) {
      const textBefore = content.slice(lastIndex, startIndex);
      parts.push(
        <span key={`text-${lastIndex}`} dangerouslySetInnerHTML={{ __html: textBefore }} />
      );
    }

    // URL이 이미지인지 확인
    if (IMAGE_EXTENSIONS.test(url)) {
      parts.push(
        <div key={`img-${startIndex}`} className="my-4 flex justify-center">
          <div className="relative max-w-full overflow-hidden rounded-lg">
            <Image
              src={url}
              alt="Content image"
              width={600}
              height={400}
              className="h-auto max-w-full object-contain"
              unoptimized // 외부 이미지의 경우
            />
          </div>
        </div>
      );
    } else {
      // 일반 링크
      parts.push(
        <a
          key={`link-${startIndex}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 underline break-all"
        >
          <svg
            className="mr-1 h-4 w-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          {url}
        </a>
      );
    }

    lastIndex = endIndex;
  }

  // 남은 텍스트 추가
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex);
    parts.push(
      <span key={`text-${lastIndex}`} dangerouslySetInnerHTML={{ __html: remainingText }} />
    );
  }

  return parts.length > 0 ? parts : [<span key="content" dangerouslySetInnerHTML={{ __html: content }} />];
}

/**
 * 컨텐츠를 처리하여 링크를 적절한 컴포넌트로 변환
 */
export function ProcessedContent({ content }: { content: string }) {
  const processedParts = processContentLinks(content);
  
  return (
    <div className="processed-content">
      {processedParts}
    </div>
  );
}

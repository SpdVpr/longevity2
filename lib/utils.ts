/**
 * Utility functions for the application
 */

import {
  StrapiData,
  StrapiCollectionResponse,
  StrapiSingleResponse,
  ArticleAttributes,
  CategoryAttributes,
  TagAttributes,
  AuthorAttributes,
  Article,
  Category,
  Tag,
  Author,
  Pagination
} from '../types';

// Base URL for Strapi media
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Get full URL for Strapi media
 * @param {string} url - Relative URL
 * @returns {string} - Full URL
 */
export function getStrapiMedia(url: string): string {
  try {
    if (!url) return '';

    // If the URL is already absolute, return it as is
    if (url.startsWith('http') || url.startsWith('//')) {
      return url;
    }

    // Check if the URL starts with a slash
    if (!url.startsWith('/')) {
      url = `/${url}`;
    }

    // Log the final URL for debugging
    const finalUrl = `${STRAPI_URL}${url}`;
    console.log('Strapi media URL:', finalUrl);

    // Return the full URL
    return finalUrl;
  } catch (error) {
    console.error('Error getting Strapi media URL:', error);
    return '';
  }
}

/**
 * Transform Strapi article data to frontend format
 * @param {StrapiData<ArticleAttributes>} article - Strapi article data
 * @returns {Article} - Transformed article
 */
export function transformArticleData(article: any): Article {
  try {
    console.log('Raw article data to transform:', JSON.stringify(article, null, 2));

    // Check if article is valid
    if (!article) {
      console.error('Article is null or undefined');
      throw new Error('Article is null or undefined');
    }

    // Handle different possible structures
    let id, attributes;

    if (typeof article === 'object') {
      if (article.hasOwnProperty('id') && article.hasOwnProperty('attributes')) {
        // Standard Strapi v4 structure
        id = article.id;
        attributes = article.attributes;
        console.log('Standard Strapi v4 structure detected');
      } else if (article.hasOwnProperty('_id') || article.hasOwnProperty('id')) {
        // Possible alternative structure
        id = article._id || article.id;
        attributes = article;
        console.log('Alternative structure detected, using article as attributes');
      } else {
        // Unknown structure
        console.error('Unknown article structure:', article);
        throw new Error('Unknown article structure');
      }
    } else {
      console.error('Article is not an object:', typeof article);
      throw new Error('Article is not an object');
    }

    // Check if attributes exist
    if (!attributes) {
      console.error('Article attributes are missing');
      throw new Error('Article attributes are missing');
    }

    console.log('Using id:', id, 'and attributes:', attributes);

    // Extract category data
    let category = {
      id: 0,
      name: 'Uncategorized',
      slug: 'uncategorized',
      description: '',
      image: ''
    };

    try {
      if (attributes.category) {
        if (attributes.category.data) {
          // Standard Strapi v4 relation
          category = transformCategoryData(attributes.category.data);
        } else if (typeof attributes.category === 'object') {
          // Direct category object
          category = {
            id: attributes.category.id || 0,
            name: attributes.category.name || 'Uncategorized',
            slug: attributes.category.slug || 'uncategorized',
            description: attributes.category.description || '',
            image: attributes.category.image || ''
          };
        }
      }
    } catch (categoryError) {
      console.error('Error transforming category:', categoryError);
    }

    // Extract author data
    let author = {
      id: 0,
      name: 'Unknown',
      bio: '',
      email: '',
      avatar: ''
    };

    try {
      if (attributes.author) {
        if (attributes.author.data) {
          // Standard Strapi v4 relation
          author = transformAuthorData(attributes.author.data);
        } else if (typeof attributes.author === 'object') {
          // Direct author object
          author = {
            id: attributes.author.id || 0,
            name: attributes.author.name || 'Unknown',
            bio: attributes.author.bio || '',
            email: attributes.author.email || '',
            avatar: attributes.author.avatar || ''
          };
        }
      }
    } catch (authorError) {
      console.error('Error transforming author:', authorError);
    }

    // Extract tags data
    let tags: Tag[] = [];

    try {
      if (attributes.tags) {
        if (attributes.tags.data && Array.isArray(attributes.tags.data)) {
          // Standard Strapi v4 relation
          tags = attributes.tags.data.map(transformTagData);
        } else if (Array.isArray(attributes.tags)) {
          // Direct tags array
          tags = attributes.tags.map((tag: any) => ({
            id: tag.id || 0,
            name: tag.name || 'Uncategorized',
            slug: tag.slug || 'uncategorized'
          }));
        }
      }
    } catch (tagsError) {
      console.error('Error transforming tags:', tagsError);
    }

    // Extract image URL
    let imageUrl = '';

    try {
      console.log('Processing image data:', JSON.stringify(attributes.image, null, 2));

      if (attributes.image) {
        if (attributes.image.data && attributes.image.data.attributes) {
          // Standard Strapi v4 relation
          console.log('Found standard Strapi v4 image relation');
          imageUrl = getStrapiMedia(attributes.image.data.attributes.url || '');
        } else if (typeof attributes.image === 'string') {
          // Direct image URL
          console.log('Found direct image URL string');
          imageUrl = getStrapiMedia(attributes.image);
        } else if (attributes.image.url) {
          // Object with URL
          console.log('Found image object with URL property');
          imageUrl = getStrapiMedia(attributes.image.url);
        } else if (attributes.image.data && typeof attributes.image.data === 'object' && !attributes.image.data.attributes) {
          // Handle case where data exists but doesn't have attributes
          console.log('Found image.data without attributes property');
          if (attributes.image.data.url) {
            imageUrl = getStrapiMedia(attributes.image.data.url);
          } else if (Array.isArray(attributes.image.data) && attributes.image.data.length > 0) {
            // Handle case where data is an array
            const firstImage = attributes.image.data[0];
            if (firstImage.attributes && firstImage.attributes.url) {
              imageUrl = getStrapiMedia(firstImage.attributes.url);
            } else if (firstImage.url) {
              imageUrl = getStrapiMedia(firstImage.url);
            }
          }
        }
      }

      console.log('Final image URL:', imageUrl);
    } catch (imageError) {
      console.error('Error extracting image URL:', imageError);
    }

    // Process Content field (Strapi v4 sometimes uses uppercase field names)
    let content = '';

    try {
      if (attributes.content) {
        // Standard content field
        content = attributes.content;
        console.log('Using standard content field');
      } else if (attributes.Content) {
        // Content field with uppercase C (as seen in the API response)
        console.log('Found Content field with uppercase C');

        if (Array.isArray(attributes.Content)) {
          // Content is an array of blocks (Strapi blocks or rich text format)
          console.log('Content is an array of blocks, converting to HTML');
          content = convertContentBlocksToHtml(attributes.Content);
        } else if (typeof attributes.Content === 'string') {
          // Content is already a string
          content = attributes.Content;

          // Check if content is wrapped in article-content div
          if (!content.includes('class="article-content"')) {
            console.log('Content is not wrapped in article-content div, wrapping it');
            content = `<div class="article-content">${content}</div>`;
          }
        } else {
          console.error('Unknown Content format:', attributes.Content);
        }
      } else if (attributes.Description) {
        // Fallback to Description field if available
        content = attributes.Description || '';
        console.log('Using Description field as fallback');
      }

      // If content is still empty, create a default content
      if (!content && attributes.title) {
        console.log('Creating default content for article:', attributes.title);
        content = `<div class="article-content"><p>Content for this article is currently being prepared. Please check back later.</p></div>`;
      }
    } catch (contentError) {
      console.error('Error processing content:', contentError);
    }

    console.log('Processed content length:', content.length);
    if (content.length > 0) {
      console.log('Content preview:', content.substring(0, 100) + '...');
    }

    // Create the transformed article
    const transformedArticle = {
      id: id || 0,
      title: attributes.title || 'Untitled',
      slug: attributes.slug || `untitled-${id}`,
      content: content,
      excerpt: attributes.excerpt || attributes.Description || '',
      publishedAt: attributes.publishedAt || attributes.published_at || new Date().toISOString(),
      image: imageUrl,
      category,
      author,
      tags,
      featured: attributes.featured || attributes.Featured || false
    };

    console.log('Successfully transformed article:', transformedArticle);
    return transformedArticle;
  } catch (error) {
    console.error('Error transforming article data:', error);
    // Return a default article object in case of error
    return {
      id: 0,
      title: 'Error: Data Processing Failed',
      slug: 'error-data-processing-failed',
      content: 'This article could not be loaded due to a data processing error.',
      excerpt: 'This article could not be loaded due to a data processing error.',
      publishedAt: new Date().toISOString(),
      image: '',
      category: { id: 0, name: 'Uncategorized', slug: 'uncategorized', description: '', image: '' },
      author: { id: 0, name: 'Unknown', bio: '', email: '', avatar: '' },
      tags: [],
      featured: false
    };
  }
}

/**
 * Transform Strapi category data to frontend format
 * @param {StrapiData<CategoryAttributes>} category - Strapi category data
 * @returns {Category} - Transformed category
 */
export function transformCategoryData(category: StrapiData<CategoryAttributes>): Category {
  try {
    if (!category || !category.attributes) {
      console.error('Invalid category data:', category);
      return {
        id: 0,
        name: 'Uncategorized',
        slug: 'uncategorized',
        description: '',
        image: ''
      };
    }

    const { id, attributes } = category;

    return {
      id: id || 0,
      name: attributes.name || 'Uncategorized',
      slug: attributes.slug || 'uncategorized',
      description: attributes.description || '',
      image: getStrapiMedia(attributes.image?.data?.attributes?.url || '')
    };
  } catch (error) {
    console.error('Error transforming category data:', error);
    return {
      id: 0,
      name: 'Error',
      slug: 'error',
      description: '',
      image: ''
    };
  }
}

/**
 * Transform Strapi tag data to frontend format
 * @param {StrapiData<TagAttributes>} tag - Strapi tag data
 * @returns {Tag} - Transformed tag
 */
export function transformTagData(tag: StrapiData<TagAttributes>): Tag {
  try {
    if (!tag || !tag.attributes) {
      console.error('Invalid tag data:', tag);
      return {
        id: 0,
        name: 'Uncategorized',
        slug: 'uncategorized'
      };
    }

    const { id, attributes } = tag;

    return {
      id: id || 0,
      name: attributes.name || 'Uncategorized',
      slug: attributes.slug || 'uncategorized'
    };
  } catch (error) {
    console.error('Error transforming tag data:', error);
    return {
      id: 0,
      name: 'Error',
      slug: 'error'
    };
  }
}

/**
 * Transform Strapi author data to frontend format
 * @param {StrapiData<AuthorAttributes>} author - Strapi author data
 * @returns {Author} - Transformed author
 */
export function transformAuthorData(author: StrapiData<AuthorAttributes>): Author {
  try {
    if (!author || !author.attributes) {
      console.error('Invalid author data:', author);
      return {
        id: 0,
        name: 'Unknown Author',
        bio: '',
        email: '',
        avatar: ''
      };
    }

    const { id, attributes } = author;

    return {
      id: id || 0,
      name: attributes.name || 'Unknown Author',
      bio: attributes.bio || '',
      email: attributes.email || '',
      avatar: getStrapiMedia(attributes.avatar?.data?.attributes?.url || '')
    };
  } catch (error) {
    console.error('Error transforming author data:', error);
    return {
      id: 0,
      name: 'Error',
      bio: '',
      email: '',
      avatar: ''
    };
  }
}

/**
 * Transform Strapi articles collection to frontend format
 * @param {StrapiCollectionResponse<ArticleAttributes>} response - Strapi response
 * @returns {Object} - Transformed articles and pagination
 */
export function transformArticlesResponse(response: any): {
  articles: Article[];
  pagination: Pagination;
} {
  console.log('Transforming articles response:', JSON.stringify(response, null, 2));

  // Default pagination
  const defaultPagination = {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0
  };

  try {
    // Check if response is valid
    if (!response) {
      console.error('Response is null or undefined');
      return { articles: [], pagination: defaultPagination };
    }

    // Handle different possible response structures
    let data, meta;

    if (response.data !== undefined) {
      // Standard Strapi v4 response
      data = response.data;
      meta = response.meta;
      console.log('Standard Strapi v4 response structure detected');
    } else if (Array.isArray(response)) {
      // Direct array of items
      data = response;
      meta = { pagination: defaultPagination };
      console.log('Direct array response structure detected');
    } else if (response.items || response.results || response.articles) {
      // Alternative response structure
      data = response.items || response.results || response.articles;
      meta = {
        pagination: response.pagination || response.meta?.pagination || defaultPagination
      };
      console.log('Alternative response structure detected');
    } else {
      // Unknown structure
      console.error('Unknown response structure:', response);
      return { articles: [], pagination: defaultPagination };
    }

    // Check if data is an array
    if (!Array.isArray(data)) {
      console.error('Response data is not an array:', data);
      return { articles: [], pagination: defaultPagination };
    }

    // Log data array info
    console.log('Response data array length:', data.length);

    // Map each item to an article
    const articles = data.map((item, index) => {
      console.log(`Processing item ${index}:`, item ? JSON.stringify(item).substring(0, 100) + '...' : 'undefined');

      if (!item) {
        console.error(`Item ${index} is null or undefined`);
        return null;
      }

      try {
        return transformArticleData(item);
      } catch (itemError) {
        console.error(`Error transforming item ${index}:`, itemError);
        return null;
      }
    }).filter(article => article !== null) as Article[];

    // Extract pagination
    const pagination = meta?.pagination || {
      page: 1,
      pageSize: articles.length,
      pageCount: 1,
      total: articles.length
    };

    console.log('Successfully transformed', articles.length, 'articles');
    console.log('Pagination:', pagination);

    return { articles, pagination };
  } catch (error) {
    console.error('Error transforming articles response:', error);
    return { articles: [], pagination: defaultPagination };
  }
}

/**
 * Transform Strapi categories collection to frontend format
 * @param {StrapiCollectionResponse<CategoryAttributes>} response - Strapi response
 * @returns {Category[]} - Transformed categories
 */
export function transformCategoriesResponse(response: StrapiCollectionResponse<CategoryAttributes>): Category[] {
  try {
    if (!response || !response.data) {
      console.error('Invalid categories response:', response);
      return [];
    }

    return response.data.map(category => {
      try {
        return transformCategoryData(category);
      } catch (error) {
        console.error('Error transforming category:', error);
        return {
          id: 0,
          name: 'Error',
          slug: 'error',
          description: '',
          image: ''
        };
      }
    });
  } catch (error) {
    console.error('Error transforming categories response:', error);
    return [];
  }
}

/**
 * Transform Strapi tags collection to frontend format
 * @param {StrapiCollectionResponse<TagAttributes>} response - Strapi response
 * @returns {Tag[]} - Transformed tags
 */
export function transformTagsResponse(response: StrapiCollectionResponse<TagAttributes>): Tag[] {
  return response.data.map(transformTagData);
}

/**
 * Format date to locale string
 * @param {string} dateString - Date string
 * @param {string} locale - Locale code
 * @returns {string} - Formatted date
 */
export function formatDate(dateString: string, locale = 'en'): string {
  try {
    if (!dateString) {
      return 'Unknown date';
    }

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
      return 'Invalid date';
    }

    return date.toLocaleDateString(locale === 'cs' ? 'cs-CZ' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Error formatting date';
  }
}

/**
 * Create excerpt from HTML content
 * @param {string} html - HTML content
 * @param {number} maxLength - Maximum length
 * @returns {string} - Excerpt
 */
/**
 * Convert Strapi content blocks to HTML
 * @param {any[]} blocks - Content blocks from Strapi
 * @returns {string} - HTML string
 */
export function convertContentBlocksToHtml(blocks: any[]): string {
  try {
    if (!blocks || !Array.isArray(blocks)) {
      console.error('Invalid blocks:', blocks);
      return '';
    }

    console.log('Converting blocks to HTML:', blocks.length, 'blocks');

    return blocks.map(block => {
      try {
        // Handle different block types
        if (block.type === 'paragraph') {
          return processParagraphBlock(block);
        } else if (block.type === 'heading') {
          return processHeadingBlock(block);
        } else if (block.type === 'list') {
          return processListBlock(block);
        } else if (block.type === 'image') {
          return processImageBlock(block);
        } else if (block.type === 'quote') {
          return processQuoteBlock(block);
        } else if (block.type === 'code') {
          return processCodeBlock(block);
        } else {
          console.warn('Unknown block type:', block.type);
          return '';
        }
      } catch (blockError) {
        console.error('Error processing block:', blockError);
        return '';
      }
    }).join('');
  } catch (error) {
    console.error('Error converting blocks to HTML:', error);
    return '';
  }
}

/**
 * Process paragraph block
 * @param {any} block - Paragraph block
 * @returns {string} - HTML string
 */
function processParagraphBlock(block: any): string {
  try {
    if (!block.children || !Array.isArray(block.children)) {
      return `<p></p>`;
    }

    const content = block.children.map(child => {
      if (child.type === 'text') {
        let text = child.text || '';

        // Apply formatting if available
        if (child.bold) text = `<strong>${text}</strong>`;
        if (child.italic) text = `<em>${text}</em>`;
        if (child.underline) text = `<u>${text}</u>`;
        if (child.strikethrough) text = `<s>${text}</s>`;
        if (child.code) text = `<code>${text}</code>`;

        return text;
      } else if (child.type === 'link' && child.url) {
        return `<a href="${child.url}" target="_blank" rel="noopener noreferrer">${child.children?.[0]?.text || child.url}</a>`;
      }

      return child.text || '';
    }).join('');

    return `<p>${content}</p>`;
  } catch (error) {
    console.error('Error processing paragraph block:', error);
    return '<p>Error processing content</p>';
  }
}

/**
 * Process heading block
 * @param {any} block - Heading block
 * @returns {string} - HTML string
 */
function processHeadingBlock(block: any): string {
  try {
    const level = block.level || 2;
    const content = block.children?.map(child => child.text || '').join('') || '';

    return `<h${level}>${content}</h${level}>`;
  } catch (error) {
    console.error('Error processing heading block:', error);
    return '<h2>Error processing heading</h2>';
  }
}

/**
 * Process list block
 * @param {any} block - List block
 * @returns {string} - HTML string
 */
function processListBlock(block: any): string {
  try {
    const listType = block.format === 'ordered' ? 'ol' : 'ul';

    const items = block.children?.map(item => {
      const content = item.children?.map(child => child.text || '').join('') || '';
      return `<li>${content}</li>`;
    }).join('') || '';

    return `<${listType}>${items}</${listType}>`;
  } catch (error) {
    console.error('Error processing list block:', error);
    return '<ul><li>Error processing list</li></ul>';
  }
}

/**
 * Process image block
 * @param {any} block - Image block
 * @returns {string} - HTML string
 */
function processImageBlock(block: any): string {
  try {
    const url = block.url || '';
    const alt = block.alt || '';
    const caption = block.caption || '';

    let html = `<img src="${url}" alt="${alt}" class="w-full rounded-lg" />`;

    if (caption) {
      html += `<figcaption class="text-sm text-gray-500 mt-2">${caption}</figcaption>`;
    }

    return `<figure class="my-8">${html}</figure>`;
  } catch (error) {
    console.error('Error processing image block:', error);
    return '<p>Error processing image</p>';
  }
}

/**
 * Process quote block
 * @param {any} block - Quote block
 * @returns {string} - HTML string
 */
function processQuoteBlock(block: any): string {
  try {
    const content = block.children?.map(child => child.text || '').join('') || '';

    return `<blockquote class="border-l-4 border-gray-300 pl-4 italic my-6">${content}</blockquote>`;
  } catch (error) {
    console.error('Error processing quote block:', error);
    return '<blockquote>Error processing quote</blockquote>';
  }
}

/**
 * Process code block
 * @param {any} block - Code block
 * @returns {string} - HTML string
 */
function processCodeBlock(block: any): string {
  try {
    const content = block.children?.map(child => child.text || '').join('') || '';

    return `<pre><code>${content}</code></pre>`;
  } catch (error) {
    console.error('Error processing code block:', error);
    return '<pre><code>Error processing code</code></pre>';
  }
}

export function createExcerpt(html: string, maxLength = 150): string {
  try {
    if (!html) {
      return '';
    }

    // Remove HTML tags
    const text = html.replace(/<\/?[^>]+(>|$)/g, '');

    // Trim and limit length
    if (text.length <= maxLength) {
      return text;
    }

    // Find the last space before maxLength
    const lastSpace = text.lastIndexOf(' ', maxLength);

    // If no space found, just cut at maxLength
    if (lastSpace === -1) {
      return `${text.substring(0, maxLength)}...`;
    }

    // Cut at the last space and add ellipsis
    return `${text.substring(0, lastSpace)}...`;
  } catch (error) {
    console.error('Error creating excerpt:', error);
    return 'Error creating excerpt';
  }
}

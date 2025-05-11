import { Article, Pagination } from '../types';

// Define the Strapi API URL
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Fetches articles from Strapi CMS
 * @param page Page number
 * @param pageSize Number of articles per page
 * @param locale Locale code (e.g., 'en', 'cs')
 * @returns Articles and pagination info
 */
export async function getArticles(page: number = 1, pageSize: number = 10, locale: string = 'en'): Promise<{
  articles: Article[];
  pagination: Pagination;
}> {
  try {
    console.log(`Fetching articles from ${API_URL}/api/articles`);
    
    const response = await fetch(`${API_URL}/api/articles?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&locale=${locale}`);
    
    if (!response.ok) {
      console.error('Failed to fetch articles:', response.status, response.statusText);
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Articles data from API:', data);
    
    if (!data.data || !Array.isArray(data.data)) {
      console.error('Invalid data format from API:', data);
      return {
        articles: [],
        pagination: {
          page: 1,
          pageSize: pageSize,
          pageCount: 0,
          total: 0
        }
      };
    }
    
    const articles = data.data.map((item: any) => {
      return {
        id: item.id,
        title: item.attributes.title,
        content: item.attributes.Content,
        excerpt: item.attributes.excerpt,
        slug: item.attributes.slug,
        publishedAt: item.attributes.publishedAt,
        image: item.attributes.image?.data?.attributes?.url 
          ? `${API_URL}${item.attributes.image.data.attributes.url}`
          : null,
        category: item.attributes.category?.data 
          ? {
              id: item.attributes.category.data.id,
              name: item.attributes.category.data.attributes.name,
              slug: item.attributes.category.data.attributes.slug
            }
          : null
      };
    });
    
    return {
      articles,
      pagination: {
        page: data.meta.pagination.page,
        pageSize: data.meta.pagination.pageSize,
        pageCount: data.meta.pagination.pageCount,
        total: data.meta.pagination.total
      }
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      articles: [],
      pagination: {
        page: 1,
        pageSize: pageSize,
        pageCount: 0,
        total: 0
      }
    };
  }
}

/**
 * Fetches a single article by slug
 * @param slug Article slug
 * @param locale Locale code (e.g., 'en', 'cs')
 * @returns Article or null if not found
 */
export async function getArticleBySlug(slug: string, locale: string = 'en'): Promise<Article | null> {
  try {
    console.log(`Fetching article with slug ${slug} from ${API_URL}/api/articles`);
    
    const response = await fetch(`${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*&locale=${locale}`);
    
    if (!response.ok) {
      console.error('Failed to fetch article:', response.status, response.statusText);
      throw new Error(`Failed to fetch article: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Article data from API:', data);
    
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.error('Article not found or invalid data format:', data);
      return null;
    }
    
    const item = data.data[0];
    
    return {
      id: item.id,
      title: item.attributes.title,
      content: item.attributes.Content,
      excerpt: item.attributes.excerpt,
      slug: item.attributes.slug,
      publishedAt: item.attributes.publishedAt,
      image: item.attributes.image?.data?.attributes?.url 
        ? `${API_URL}${item.attributes.image.data.attributes.url}`
        : null,
      category: item.attributes.category?.data 
        ? {
            id: item.attributes.category.data.id,
            name: item.attributes.category.data.attributes.name,
            slug: item.attributes.category.data.attributes.slug
          }
        : null
    };
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

/**
 * Fetches articles by category
 * @param categorySlug Category slug
 * @param page Page number
 * @param pageSize Number of articles per page
 * @param locale Locale code (e.g., 'en', 'cs')
 * @returns Articles and pagination info
 */
export async function getArticlesByCategory(categorySlug: string, page: number = 1, pageSize: number = 10, locale: string = 'en'): Promise<{
  articles: Article[];
  pagination: Pagination;
}> {
  try {
    console.log(`Fetching articles for category ${categorySlug} from ${API_URL}/api/articles`);
    
    const response = await fetch(
      `${API_URL}/api/articles?filters[category][slug][$eq]=${categorySlug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&locale=${locale}`
    );
    
    if (!response.ok) {
      console.error('Failed to fetch articles by category:', response.status, response.statusText);
      throw new Error(`Failed to fetch articles by category: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Category articles data from API:', data);
    
    if (!data.data || !Array.isArray(data.data)) {
      console.error('Invalid data format from API:', data);
      return {
        articles: [],
        pagination: {
          page: 1,
          pageSize: pageSize,
          pageCount: 0,
          total: 0
        }
      };
    }
    
    const articles = data.data.map((item: any) => {
      return {
        id: item.id,
        title: item.attributes.title,
        content: item.attributes.Content,
        excerpt: item.attributes.excerpt,
        slug: item.attributes.slug,
        publishedAt: item.attributes.publishedAt,
        image: item.attributes.image?.data?.attributes?.url 
          ? `${API_URL}${item.attributes.image.data.attributes.url}`
          : null,
        category: item.attributes.category?.data 
          ? {
              id: item.attributes.category.data.id,
              name: item.attributes.category.data.attributes.name,
              slug: item.attributes.category.data.attributes.slug
            }
          : null
      };
    });
    
    return {
      articles,
      pagination: {
        page: data.meta.pagination.page,
        pageSize: data.meta.pagination.pageSize,
        pageCount: data.meta.pagination.pageCount,
        total: data.meta.pagination.total
      }
    };
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return {
      articles: [],
      pagination: {
        page: 1,
        pageSize: pageSize,
        pageCount: 0,
        total: 0
      }
    };
  }
}

/**
 * Fetches featured articles
 * @param limit Number of articles to fetch
 * @param locale Locale code (e.g., 'en', 'cs')
 * @returns Array of articles
 */
export async function getFeatured(limit: number = 3, locale: string = 'en'): Promise<Article[]> {
  try {
    const { articles } = await getArticles(1, limit, locale);
    return articles;
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
}

/**
 * Searches for articles
 * @param query Search query
 * @param page Page number
 * @param pageSize Number of articles per page
 * @param locale Locale code (e.g., 'en', 'cs')
 * @returns Articles and pagination info
 */
export async function search(query: string, page: number = 1, pageSize: number = 10, locale: string = 'en'): Promise<{
  articles: Article[];
  pagination: Pagination;
}> {
  try {
    console.log(`Searching articles with query "${query}" from ${API_URL}/api/articles`);
    
    const response = await fetch(
      `${API_URL}/api/articles?filters[$or][0][title][$containsi]=${query}&filters[$or][1][excerpt][$containsi]=${query}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&locale=${locale}`
    );
    
    if (!response.ok) {
      console.error('Failed to search articles:', response.status, response.statusText);
      throw new Error(`Failed to search articles: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Search results from API:', data);
    
    if (!data.data || !Array.isArray(data.data)) {
      console.error('Invalid data format from API:', data);
      return {
        articles: [],
        pagination: {
          page: 1,
          pageSize: pageSize,
          pageCount: 0,
          total: 0
        }
      };
    }
    
    const articles = data.data.map((item: any) => {
      return {
        id: item.id,
        title: item.attributes.title,
        content: item.attributes.Content,
        excerpt: item.attributes.excerpt,
        slug: item.attributes.slug,
        publishedAt: item.attributes.publishedAt,
        image: item.attributes.image?.data?.attributes?.url 
          ? `${API_URL}${item.attributes.image.data.attributes.url}`
          : null,
        category: item.attributes.category?.data 
          ? {
              id: item.attributes.category.data.id,
              name: item.attributes.category.data.attributes.name,
              slug: item.attributes.category.data.attributes.slug
            }
          : null
      };
    });
    
    return {
      articles,
      pagination: {
        page: data.meta.pagination.page,
        pageSize: data.meta.pagination.pageSize,
        pageCount: data.meta.pagination.pageCount,
        total: data.meta.pagination.total
      }
    };
  } catch (error) {
    console.error('Error searching articles:', error);
    return {
      articles: [],
      pagination: {
        page: 1,
        pageSize: pageSize,
        pageCount: 0,
        total: 0
      }
    };
  }
}

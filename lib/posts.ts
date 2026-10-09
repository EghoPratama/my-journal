import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  images?: string[];
  contentHtml: string;
  order?: number;
}

export async function getSortedPostsData(): Promise<PostData[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Parse bagian metadata (frontmatter)
        const matterResult = matter(fileContents);

        // Convert isi Markdown ke HTML
        const processedContent = await remark()
          .use(html)
          .process(matterResult.content);
        const contentHtml = processedContent.toString();

        return {
          slug,
          contentHtml,
          title: matterResult.data.title,
          date: matterResult.data.date,
          images: matterResult.data.images || null,
          order: matterResult.data.order || 0,
        };
      })
  );

  // Urutkan berdasarkan order/tanggal
  return allPostsData.sort((a, b) => (a.order > b.order ? 1 : -1));
}
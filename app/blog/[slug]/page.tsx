import { notFound } from 'next/navigation';
import BlogPostContent from './BlogPostContent';
import { dataBlog, BlogPost } from '../data';  // Adjust this import path as needed

export async function generateStaticParams() {
  return dataBlog.map(post => ({
    slug: post.slug
  }));
}

async function getPost(slug: string): Promise<BlogPost | undefined> {
  return dataBlog.find(post => post.slug === slug);
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}
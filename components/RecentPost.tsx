import React from "react";
import Link from "next/link";
import { BlogPost } from "@/app/blog/data";
import Image from "next/image";

interface RecentPostsProps {
  posts: BlogPost[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  const recentPosts = posts.slice(0, 3);

  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-lg p-6 mb-8 max-w-3xl mx-auto" id="blog">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Últimos posts</h2>
      <ul className="space-y-4">
        {recentPosts.map((post) => (
          <li key={post.title} className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="h-24 w-48 rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.author.name}
                  height={24}
                  width={48}
                  className="object-fill h-full w-full"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                <Link href={`/blog/${post.slug}`} className="hover:underline text-black dark:text-white">
                  {post.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{post.excerpt}</p>
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {new Date(post.date).toLocaleDateString("es-AR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link href="/blog">
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
            Ver todos los posts
          </button>
        </Link>
      </div>
    </section>

  );
};

export default RecentPosts;

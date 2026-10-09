import { getSortedPostsData } from '@/lib/posts';
import Image from 'next/image';

export default async function JournalPage() {
  const posts = await getSortedPostsData();

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#222222] py-12 px-4 font-sans">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header Profile */}
        <header className="flex items-center justify-between border-b pb-6 border-stone-200">
          <div className="flex items-center gap-3">
            <Image 
              src="https://images.glints.com/unsafe/140x140/glints-dashboard.oss-ap-southeast-1-internal.aliyuncs.com/profile-picture/b6bb05bc-0117-4028-b426-cd85dcc0c9ea.jpg" 
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="font-semibold text-stone-800">Journal Egho</span>
          </div>
          {/* <a href="https://domainkamu.com" className="text-xs font-mono text-stone-500 hover:text-stone-800">
            domainkamu.com →
          </a> */}
        </header>

        {/* Entries Feed dari Markdown */}
        <section className="space-y-16">
          {posts.map((post, postIdx) => (
            <article key={post.slug} className="space-y-4 border-b border-stone-200/60 pb-12">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
                  {post.title}
                </h2>
                <time className="text-xs font-mono text-stone-400 block">
                  {post.date}
                </time>
              </div>

              {/* Grid Gambar jika ada di frontmatter */}
              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 my-4">
                  {post.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square overflow-hidden rounded-sm bg-stone-100">
                      <Image 
                        src={img} 
                        alt="" 
                        fill
                        priority={postIdx === 0}
                        sizes="(max-width: 640px) 33vw, 200px"
                        className="object-cover" 
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Render isi tulisan dari Markdown */}
              <div 
                className="prose prose-stone max-w-none text-stone-700 leading-relaxed text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
              />
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
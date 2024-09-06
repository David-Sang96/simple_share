import { db } from '@/db/index';
import Link from 'next/link';

// export const dynamic = 'force-dynamic';

export default async function Posts() {
  const posts = await db.post.findMany({ orderBy: { id: 'desc' } });

  return (
    <section>
      {posts.length > 0 ? (
        <div className='grid gap-2 md:grid-cols-2'>
          {posts.map(({ id, title, description }) => (
            <div
              className='rounded-md border border-slate-300 p-3 shadow'
              key={id}
            >
              <h4 className='pb-2 font-semibold uppercase md:text-xl'>
                {title}
              </h4>
              <div className='line-clamp-2 text-sm md:text-base'>
                {description}
              </div>
              <Link
                href={`/posts/${id}`}
                className='block w-full pt-2 text-end text-sm underline-offset-2 md:text-base'
              >
                read more
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className='pt-20 text-center'>
          <span className='text-lg font-bold tracking-wider'>
            No Posts Found.
          </span>
          <Link href={'/posts/create'} className='underline underline-offset-4'>
            Create
          </Link>{' '}
          here.
        </div>
      )}
    </section>
  );
}

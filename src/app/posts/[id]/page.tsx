import { notFound, redirect } from 'next/navigation';
import { CiEdit } from 'react-icons/ci';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';

import { db } from '@/db/index';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

const PostDetails = async ({ params }: Props) => {
  // await new Promise((resolve) => setTimeout(resolve, 500));

  const id = parseInt(params.id);
  const post = await db.post.findFirst({ where: { id } });

  const handleDelete = async () => {
    'use server';
    await db.post.delete({ where: { id } });

    revalidatePath('/');
    redirect('/');
  };

  if (!post) return notFound();

  return (
    <div className='rounded-md border border-slate-300 p-5 shadow' key={id}>
      <div className='flex items-center justify-between pb-4'>
        <h4 className='text-lg font-semibold uppercase tracking-wider md:text-xl'>
          {post.title}
        </h4>
        <Link href={'/'}>
          <IoArrowBackOutline className='size-6' />
        </Link>
      </div>
      <div className='text-sm font-medium tracking-wider md:text-base'>
        {post.description}
      </div>
      <div className='flex items-center justify-end gap-4 pt-5'>
        <Link href={`/posts/${post.id}/edit`}>
          <CiEdit className='size-6' />
        </Link>
        <form action={handleDelete} className='flex items-center'>
          <button>
            <MdDeleteForever className='size-7 cursor-pointer fill-red-600' />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetails;

export const generateStaticParams = async () => {
  const posts = await db.post.findMany();
  return posts.map((post) => ({ id: post.id.toString() }));
};

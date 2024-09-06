'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

interface FormState {
  message: string;
  name: string;
  id?: number;
}

export const postServerAction = async (
  formState: FormState,
  formData: FormData
) => {
  const title = formData.get('title');
  const description = formData.get('description');

  if (typeof title !== 'string' || title.length < 5) {
    return {
      message: 'Title must have at least 5 letters',
      name: 'title',
      id: formState.id,
    };
  }

  if (typeof description !== 'string' || description.length < 20) {
    return {
      message: 'Description must have at least 20 letters',
      name: 'description',
      id: formState.id,
    };
  }

  if (formState.id && formState.id !== undefined) {
    await db.post.update({
      where: { id: formState.id },
      data: {
        title,
        description,
      },
    });
  } else {
    await db.post.create({
      data: {
        title,
        description,
      },
    });
  }

  revalidatePath('/');
  redirect('/');
};

export const getOldPost = async (id: number) => {
  const oldPost = await db.post.findFirst({ where: { id } });

  if (!oldPost) return notFound();

  return oldPost;
};

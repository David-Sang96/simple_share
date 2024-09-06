'use client';

import { postServerAction } from '@/actions';
import { useFormState } from 'react-dom';

const Create = () => {
  const [formState, PostAction] = useFormState(postServerAction, {
    message: '',
    name: '',
    id: undefined,
  });

  return (
    <section className='md:mx-auto md:w-1/2'>
      <h2 className='text-center text-lg font-bold uppercase md:text-2xl'>
        Create Post
      </h2>
      <p className='text-center text-sm font-medium text-gray-600 md:text-base'>
        Create your own post now
      </p>

      <form className='mt-6 space-y-4' action={PostAction}>
        <div>
          <label htmlFor='title' className='text-sm font-medium md:text-base'>
            Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            className='mt-2 block w-full rounded border-2 border-slate-300 px-2 py-1 focus:outline-none'
          />
          {formState.message && formState.name === 'title' && (
            <div className='pt-2 text-sm text-red-500'>{formState.message}</div>
          )}
        </div>
        <div>
          <label
            htmlFor='description'
            className='text-sm font-medium md:text-base'
          >
            Description
          </label>
          <textarea
            name='description'
            id='description'
            rows={8}
            className='mt-2 block w-full rounded border-2 border-slate-300 px-2 py-1 focus:outline-none'
          />
          {formState.message && formState.name === 'description' && (
            <div className='pt-2 text-sm text-red-500'>{formState.message}</div>
          )}
        </div>

        <button
          type='submit'
          className='block w-full rounded bg-slate-600 px-3 py-2 text-white shadow duration-300 hover:bg-slate-700'
        >
          Create
        </button>
      </form>
    </section>
  );
};

export default Create;

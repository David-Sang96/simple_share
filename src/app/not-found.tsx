import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='flex h-[300px] flex-col items-center justify-center'>
      <div className='text-center text-lg font-bold'>
        404:NOT FOUND | Something went wrong
      </div>
      <Link
        href={'/'}
        className='mt-3 duration-300 hover:underline hover:underline-offset-4'
      >
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;

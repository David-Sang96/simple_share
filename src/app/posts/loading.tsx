import { ImSpinner9 } from 'react-icons/im';

const loading = () => {
  return (
    <div className='flex h-[200px] items-center justify-center gap-2'>
      <ImSpinner9 className='size-5 animate-spin' />
      loading ...
    </div>
  );
};

export default loading;

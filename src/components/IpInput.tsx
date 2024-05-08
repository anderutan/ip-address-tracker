import { useState } from 'react';
import MaskedInput from 'react-text-mask';
import { ipAddressProps } from '../util/ipAddressFormat';
import IconArrow from '../assets/icon-arrow.svg';

type IpInputProps = {
  setIpAddress: (ipAddress: string) => void;
};

const IpInput = ({ setIpAddress }: IpInputProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIpAddress(input);
  };

  return (
    <form className='w-full max-w-[400px] mb-5' onSubmit={handleSubmit}>
      <div className='w-full flex'>
        {/* https://codesandbox.io/embed/react-text-mask-ip-kg27g */}
        <MaskedInput
          {...ipAddressProps}
          onChange={(e) => setInput(e.target.value)}
          className='py-5 pl-5 pr-2 rounded-l-xl w-full text-lg'
        />
        <button
          type='submit'
          className='bg-black w-1/5 flex items-center justify-center rounded-r-xl'
        >
          <img src={IconArrow} alt='' className='h-3 w-3 text-white' />
        </button>
      </div>
    </form>
  );
};

export default IpInput;

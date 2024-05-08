import { type DataType } from './util/type';

function extractUTCOffset(str: string): string {
  const regex = /\(UTC([+-]\d{2}:\d{2})\)/;
  const match = regex.exec(str);
  if (match && match[1]) {
    return 'UTC ' + match[1];
  } else {
    return str;
  }
}

const Info = ({ info }: DataType) => {
  const titleCSS =
    'text-gray-400 font-semibold text-xs tracking-wider mb-1 text-center sm:text-left';
  const descriptionCSS = 'text-lg font-medium mb-4 text-center sm:text-left';
  return (
    <div className='bg-gray-100 w-full pt-4 rounded-lg flex flex-col items-center shadow-lg sm:flex-row sm:p-5 sm:py-6 sm:justify-between sm:items-start sm:max-w-[1200px]'>
      <div className='sm:px-5 mx-5'>
        <p className={titleCSS}>IP ADDRESS</p>
        <p className={descriptionCSS}>{info.ip}</p>
      </div>
      <div className=' sm:px-5 sm:border-l-2 sm:border-gray-300 sm:self-stretch'>
        <p className={titleCSS}>LOCATION</p>
        <p className={descriptionCSS}>
          {info.flag} {info.city}, {info.state}
        </p>
      </div>
      <div className=' sm:px-5 sm:border-l-2 sm:border-gray-300 sm:self-stretch'>
        <p className={titleCSS}>TIMEZONE</p>
        <p className={descriptionCSS}>{extractUTCOffset(info.timeZone)}</p>
      </div>
      <div className=' sm:px-5 sm:border-l-2 sm:border-gray-300 sm:self-stretch'>
        <p className={titleCSS}>ISP</p>
        <p className={`${descriptionCSS} mb-0`}>{info.isp}</p>
      </div>
    </div>
  );
};

export default Info;

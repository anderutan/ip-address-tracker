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
    'text-gray-400 font-semibold text-xs tracking-wider mb-1 text-center';
  const descriptionCSS = 'text-lg font-medium mb-4 text-center';
  return (
    <div className='bg-gray-100 w-full pt-4 rounded-lg flex flex-col items-center shadow-lg'>
      <div>
        <p className={titleCSS}>IP ADDRESS</p>
        <p className={descriptionCSS}>{info.ip}</p>
      </div>
      <div>
        <p className={titleCSS}>LOCATION</p>
        <p className={descriptionCSS}>
          {info.flag} {info.city}, {info.state}
        </p>
      </div>
      <div>
        <p className={titleCSS}>TIMEZONE</p>
        <p className={descriptionCSS}>{extractUTCOffset(info.timeZone)}</p>
      </div>
      <div>
        <p className={titleCSS}>ISP</p>
        <p className={`${descriptionCSS} mb-0`}>{info.isp}</p>
      </div>
    </div>
  );
};

export default Info;

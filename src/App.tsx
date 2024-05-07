import { useEffect, useState } from 'react';
import IpInput from './components/IpInput';
import Info from './components/Info';
import mbBg from '../src/assets/pattern-bg-mobile.png';
import API_KEY from './util/apikey';
import { DataType } from './util/type';

function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [ipInfo, setIpInfo] = useState<DataType>([]);

  const query = `https://api-bdc.net/data/ip-geolocation?ip=${ipAddress}&localityLanguage=en&key=${API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(query);
      if (!res.ok) {
        throw new Error(`There is some error ${res.status}`);
      }
      const data = await res.json();
      const filteredData: DataType[] = {
        ip: data.ip,
        flag: data.country.countryFlagEmoji,
        city: data.location.city,
        state: data.location.principalSubdivision,
        timeZone: data.location.timeZone.displayName,
        isp: data.network.carriers[0].organisation,
        longitude: data.location.longitude,
        latitude: data.location.latitude,
      };
      setIpInfo(filteredData);
    };
    fetchData();
  }, [ipAddress]);

  return (
    <div className='h-full'>
      <div
        className='h-1/3 p-5 flex flex-col items-center'
        style={{
          backgroundImage: `url(${mbBg})`,
          height: '250px',
          backgroundSize: 'cover',
        }}
      >
        <h1 className='text-white font-medium text-2xl mb-5'>
          IP Address Tracker
        </h1>
        <IpInput setIpAddress={setIpAddress} />
        <Info info={ipInfo} />
      </div>
      <div className=''>{/* show map */}</div>
    </div>
  );
}

export default App;

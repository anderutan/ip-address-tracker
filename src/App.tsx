import { useEffect, useState } from 'react';
import IpInput from './components/IpInput';
import Info from './components/Info';
import mbBg from '../src/assets/pattern-bg-mobile.png';
import API_KEY from './util/apikey';

function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [ipInfo, setIpInfo] = useState([]);

  const query = `https://api-bdc.net/data/ip-geolocation?ip=${ipAddress}&localityLanguage=en&key=${API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(query);
      if (!res.ok) {
        throw new Error(`There is some error ${res.status}`);
      }
      const data = await res.json();
      setIpInfo(data);
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
        <Info />
      </div>
      <div className=''>{/* show map */}</div>
    </div>
  );
}

export default App;

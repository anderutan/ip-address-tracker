import { useEffect, useState } from 'react';
import IpInput from './components/IpInput';
import Info from './components/Info';
import mbBg from '../src/assets/pattern-bg-mobile.png';
import lgBg from '../src/assets/pattern-bg-desktop.png';
import API_KEY from './util/apikey';
import { type DataType } from './util/type';
import ShowMap from './components/ShowMap';
import useScreenSize from './util/useScreenSize';

function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [ipInfo, setIpInfo] = useState<DataType | null>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const { width } = useScreenSize();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const query = `https://api-bdc.net/data/ip-geolocation?ip=${ipAddress}&localityLanguage=en&key=${API_KEY}`;
        const res = await fetch(query);
        if (!res.ok) {
          throw new Error(`There is some error ${res.status}`);
        }
        const data = await res.json();
        const filteredData: DataType = {
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
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'there was an error...';
        setIsError(message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ipAddress]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>Error: {isError}</h3>;
  }

  return (
    <>
      {ipInfo ? (
        <div className='flex flex-col'>
          <div
            className='p-5 flex flex-col items-center z-10 '
            style={{
              backgroundImage: width > 640 ? `url(${lgBg})` : `url(${mbBg})`,
              height: width > 640 ? '270px' : '350px',
              backgroundSize: 'cover',
            }}
          >
            <h1 className='text-white font-medium text-2xl mb-5 sm:text-3xl'>
              IP Address Tracker
            </h1>
            <IpInput setIpAddress={setIpAddress} />
            <Info info={ipInfo} />
          </div>
          <div className='h-full'>
            <ShowMap location={ipInfo} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;

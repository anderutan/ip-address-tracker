import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from '@vis.gl/react-google-maps';
import { GOOGLE_API_KEY, MAP_ID } from '../util/apikey';
import { type DataType } from './util/type';

export default function ShowMap({ location }: DataType) {
  const position = location
    ? {
        lat: location.latitude,
        lng: location.longitude,
      }
    : { lat: 3.14, lng: 101.67 };

  return (
    <APIProvider apiKey={GOOGLE_API_KEY}>
      <div className='h-screen w-full'>
        <Map zoom={10} center={position} mapId={MAP_ID}>
          <AdvancedMarker position={position}>
            <Pin
              background={'black'}
              borderColor={'black'}
              glyphColor={'white'}
            />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}

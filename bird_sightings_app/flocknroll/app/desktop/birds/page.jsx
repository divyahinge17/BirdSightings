"use client";
import Map from '../../components/Map';

function MyPage() {
  return (
    <div>
      <h1>USA Map</h1>
      <div id="map" style={{ height: '400px' }}></div> {/* Map container */}
      <Map />
    </div>
  );
}

export default MyPage;
"use client"
import React from 'react';
import { Chart } from 'react-google-charts';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const Map = () => {
  const router = useRouter();
  const searchParams = useSearchParams()

  const handleClick = (event) => {
    const selectedState = event.region;
    router.push(`${selectedState}`);
  };

  const stateData = [
    ['State'],
    ['AL'], ['AK'], ['AZ'], ['AR'], ['CA'], ['CO'], ['CT'], ['DE'], ['FL'], ['GA'], ['HI'], ['ID'], ['IL'], ['IN'],
    ['IA'], ['KS'], ['KY'], ['LA'], ['ME'], ['MD'], ['MA'], ['MI'], ['MN'], ['MS'], ['MO'], ['MT'], ['NE'], ['NV'],
    ['NH'], ['NJ'], ['NM'], ['NY'], ['NC'], ['ND'], ['OH'], ['OK'], ['OR'], ['PA'], ['RI'], ['SC'], ['SD'], ['TN'],
    ['TX'], ['UT'], ['VT'], ['VA'], ['WA'], ['WV'], ['WI'], ['WY']
  ];

  return (
    <div style = {{ display: 'flex', justifyContent: 'center' }}>
      <Chart
        chartType="GeoChart"
        data={stateData}
        options={{
          region: 'US',
          displayMode: 'regions',
          resolution: 'provinces',
          width: 800,
          height: 600,
          defaultColor: "#E99150"
        }}
        chartEvents={[
          {
            eventName: 'select',
            callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 1) {
                  const selectedState = stateData[selection[0].row + 1][0];
                  handleClick({ state: selectedState });
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default Map;
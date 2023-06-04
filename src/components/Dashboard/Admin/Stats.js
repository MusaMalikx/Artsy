import React, { useEffect, useState } from 'react';
import API from '../../../api/server';

/*
Renders different statistics in the admin portal
*/
const Stats = () => {
  const [stat, setStat] = useState();

  useEffect(() => {
    const getCount = async () => {
      await API.get('/api/users/count')
        .then((res) => {
          setStat(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getCount();
  }, []);

  return (
    <div>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <StatItem title="Admins" count={stat?.admins} />
        <StatItem title="Buyers" count={stat?.users} />
        <StatItem title="Artists" count={stat?.artists} />
        <StatItem title="Artworks" count={stat?.artworks} />
      </div>
    </div>
  );
};

/*
Renders a single statistic item card
*/
const StatItem = ({ title, count }) => {
  return (
    <div className="w-full max-w-full sm:flex-none">
      <div className="relative flex flex-col min-w-0 break-words bg-white shadow-lg rounded-2xl bg-clip-border">
        <div className="flex-auto p-4">
          <div className="flex flex-row -mx-3">
            <div className="flex-none w-2/3 max-w-full px-3">
              <div>
                <p className="mb-0 font-sans font-semibold leading-normal text-sm">{title}</p>
                <h5 className="mb-0 font-bold">{count}</h5>
              </div>
            </div>
            <div className="px-3 text-right basis-1/3">
              <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-primary to-blue-500">
                <i className="ni leading-none ni-cart text-lg relative top-3.5 text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

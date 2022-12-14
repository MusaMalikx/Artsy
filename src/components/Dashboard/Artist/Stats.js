import React from "react";

const Stats = () => {
  return (
    <div>
      <div class="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <StatItem />
        <StatItem />
        <StatItem />
        <StatItem />
      </div>
    </div>
  );
};

const StatItem = () => {
  return (
    <div class="w-full max-w-full sm:flex-none">
      <div class="relative flex flex-col min-w-0 break-words bg-white shadow-lg rounded-2xl bg-clip-border">
        <div class="flex-auto p-4">
          <div class="flex flex-row -mx-3">
            <div class="flex-none w-2/3 max-w-full px-3">
              <div>
                <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                  Sales
                </p>
                <h5 class="mb-0 font-bold">
                  $103,430
                  <span class="leading-normal text-sm font-weight-bolder text-lime-500">
                    +5%
                  </span>
                </h5>
              </div>
            </div>
            <div class="px-3 text-right basis-1/3">
              <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                <i class="ni leading-none ni-cart text-lg relative top-3.5 text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

"use client";

import React from 'react';
import Image from 'next/image';
import Head from "next/head";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NextResponse } from "next/server";


const TopicsPage = () => {
  const [threadsData, setThreadsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://35.240.181.64/api/discover-thread/?format=json');

        const data = response.data;
        setThreadsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="container mx-auto my-8">

      <div className="flex items-center gap-x-sm">
        <div className="w-10 h-10 p-1 m-2">
          <Image priority src="/discover.svg" alt="Compass" width={40} height={40} />
        </div>
        <h1 className="default font-display text-2xl md:text-3xl text-textMain dark:text-textMainDark selection:bg-superDuper selection:text-textMain">Discover</h1>
      </div>

      <br />
      
      {threadsData.map((thread, index) => (
        <div key={thread.id}>
          <div className={`py-md md:px-0 flex gap-x-md items-center border-borderMain/60 dark:border-borderMainDark/80 divide-borderMain/60 dark:divide-borderMainDark/80 ring-borderMain dark:ring-borderMainDark bg-transparent ${index !== 0 ? 'mt-4' : ''}`}>
            <a href={`/detail/${thread.id}`} className="flex-none w-24 h-24 p-4 rounded-md relative overflow-hidden">
              <img
                alt={thread.title}
                decoding="async"
                data-nimg="fill"
                sizes="33vw"
                srcSet={thread.image_url}
                className="w-full h-full object-cover"
              />
            </a>
            <div className="grow">
              <a href={`/detail/${thread.id}`} className="block group">
                <div className="border-borderMain/60 dark:border-borderMainDark/80 divide-borderMain/60 dark:divide-borderMainDark/80 ring-borderMain dark:ring-borderMainDark bg-transparent">
                  <div className="flex items-center gap-x-md">
                    <div className="grow default font-sans text-base font-medium text-textMain dark:text-textMainDark selection:bg-superDuper selection:text-textMain">
                      <div data-testid="thread-title" className="md:group-hover:text-super md:dark:group-hover:text-superDark transition duration-300 line-clamp-1 break-all">{thread.title}</div>
                    </div>
                  </div>
                  <div className="line-clamp-2 mt-two break-all light font-sans text-base text-textOff dark:text-textOffDark selection:bg-superDuper selection:text-textMain">
                    {thread.description}
                  </div>
                </div>
              </a>
              <div className="mt-sm">
                <div className="flex justify-between items-center">
                <div className="flex gap-x-md items-center">
                  <div className="flex gap-x-xs items-center">
                    <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-superDuper selection:text-textMain mr-1">
                      <Image priority src="/views.svg" alt="Compass" width={10} height={10} />
                    </div>
                    <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-superDuper selection:text-textMain">{thread.views}</div>
                  </div>
                  <div className="flex gap-x-xs items-center">
                    <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-superDuper selection:text-textMain mr-1 ml-2">
                      <Image priority src="/branches.svg" alt="Compass" width={10} height={10} />
                    </div>
                    <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-superDuper selection:text-textMain">{thread.branches}</div>
                  </div>
                </div>
                <div className="flex gap-x-xs items-center">
                  <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-superDuper selection:text-textMain mr-1">
                    <Image priority src="/clock.svg" alt="Compass" width={10} height={10} />
                  </div>
                  <button type="button" className="text-textOff dark:text-textOffDark cursor-default pl-0 pr-0 font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-in-out font-sans  select-none items-center relative group  justify-center text-center items-center rounded cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-xs font-medium px-sm font-medium h-6">
                    <div className="flex items-center leading-none justify-center gap-xs">
                      <div className="text-align-center relative">{thread.time_since_posted}</div>
                    </div>
                  </button>
                </div>
                </div>
              </div>
            </div>
          </div>
          {index !== threadsData.length - 1 && <hr className="my-4 border-t border-borderMain/60 dark:border-borderMainDark/80" />}
        </div>
      ))}
    </div>
  );
};

export default TopicsPage;
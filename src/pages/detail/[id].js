import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const DynamicPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [threadDetail, setThreadDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `http://be-perplexity.muflih-gansix.com/api/thread-detail/?id=${id}`
          );

          const data = response.data;
          console.log(data);
          setThreadDetail(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const goBack = () => {
    router.push("/");
  };

  if (!threadDetail) {
    // Show loading placeholder while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          type="button"
          onClick={goBack}
          className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <Image
            priority
            src="/left-arrow.svg"
            alt="Back"
            width={16}
            height={16}
            className="mr-2"
          />
          Back
        </button>
      </div>
      <div className="my-md md:my-lg">
        <div className="break-words [word-break:break-word] whitespace-pre-line default font-display text-3xl font-regular text-textMain dark:text-textMainDark selection:bg-superDuper selection:text-textMain">
          {threadDetail.title}
        </div>
      </div>
      <div className="space-x-sm flex items-center my-4">
        <h2 className="default font-display text-lg font-medium text-textMain dark:text-textMainDark selection:bg-superDuper selection:text-textMain mr-2">
          <Image
            priority
            src="/sources.svg"
            alt="Compass"
            width={15}
            height={15}
          />
        </h2>
        <h2 className="default font-display text-lg font-medium text-textMain dark:text-textMainDark selection:bg-superDuper selection:text-textMain">
          Sources
        </h2>
      </div>
      <ul className="list-disc ml-6">
        {threadDetail.sources.map((source, index) => (
          <li key={index}>
            <Link href={source.url}>
              {index + 1}.{" "}
              <span className="underline text-blue-500">{source.url}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="space-x-sm flex items-center my-4">
        <h2 className="default font-display text-lg font-medium text-textMain dark:text-textMainDark selection:bg-superDuper selection:text-textMain mr-2">
          <Image
            priority
            src="/answer.svg"
            alt="Compass"
            width={15}
            height={15}
          />
        </h2>
        <h2 className="default font-display text-lg font-medium text-textMain dark:text-textMainDark selection:bg-superDuper selection:text-textMain">
          Answer
        </h2>
      </div>
      <div className="my-4">{threadDetail.description}</div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-md items-center">
            <div className="flex gap-x-xs items-center">
              <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-superDuper selection:text-textMain mr-1">
                <Image
                  priority
                  src="/views.svg"
                  alt="Compass"
                  width={15}
                  height={15}
                />
              </div>
              <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-superDuper selection:text-textMain">
                {threadDetail.views}
              </div>
            </div>
            <div className="flex gap-x-xs items-center">
              <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-superDuper selection:text-textMain mr-1 ml-2">
                <Image
                  priority
                  src="/branches.svg"
                  alt="Compass"
                  width={10}
                  height={10}
                />
              </div>
              <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-superDuper selection:text-textMain">
                {threadDetail.branches}
              </div>
            </div>
          </div>
          <div className="flex gap-x-xs items-center">
            <div className="light font-sans text-xs font-medium text-textOff dark:text-textOffDark selection:bg-superDuper selection:text-textMain mr-1">
              <Image
                priority
                src="/clock.svg"
                alt="Compass"
                width={10}
                height={10}
              />
            </div>
            <button
              type="button"
              className="text-textOff dark:text-textOffDark cursor-default pl-0 pr-0 font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-in-out font-sans  select-none items-center relative group  justify-center text-center items-center rounded cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-xs font-medium px-sm font-medium h-6"
            >
              <div className="flex items-center leading-none justify-center gap-xs">
                <div className="text-align-center relative">
                  {threadDetail.time_since_posted}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPage;

"use client";

import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function LoadMore() {
  const { ref, inView } = useInView();

  const [data, setData] = useState<JSX.Element[]>([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inView) {
      setLoading(true);
      fetchAnime(page)
        .then((res) => {
          setData((prevData) => [...prevData, ...res]); // Append new data to existing data
          setPage((prevPage) => prevPage + 1); // Increment the page
        })
        .catch((err) => {
          setError("Failed to load more anime.");
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [inView, page]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.length > 0 ? data : <p className="text-white">No anime available.</p>}
      </section>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Image
                src="./spinner.svg"
                alt="Loading..."
                width={56}
                height={56}
                className="object-contain"
              />
            </motion.div>
          ) : (
            <p className="text-gray-400">Scroll down to load more...</p>
          )}
        </div>
      </section>
    </>
  );
}

export default LoadMore;

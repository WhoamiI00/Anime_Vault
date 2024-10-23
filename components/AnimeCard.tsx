import Image from "next/image";
import { MotionDiv } from "./MotionDiv";
import { motion } from "framer-motion";

export interface AnimeProp {
  id: string;
  name: string;
  image: {
    original: string;
    preview: string;
    x96: string;
    x48: string;
  };
  url: string;
  kind: string;
  score: string;
  status: string;
  episodes: number;
  episodes_aired: number;
  aired_on: string;
  released_on: string | null;
}

interface Prop {
  anime: AnimeProp;
  index: number;
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function AnimeCard({ anime, index }: Prop) {
  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.2,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0.2 }}
      className="max-w-sm rounded-lg shadow-lg overflow-hidden relative w-full bg-[#1E1E2F] hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative w-full h-[40vh]">
        <Image
          src={`https://shikimori.one/${anime.image.original}`}
          alt={anime.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h2 className="font-bold text-white text-xl line-clamp-1">{anime.name}</h2>
        <div className="flex justify-between items-center">
          <div className="py-1 px-2 bg-[#161921] rounded-md">
            <p className="text-white text-sm font-bold capitalize">{anime.kind}</p>
          </div>
          <p className={`text-sm font-semibold ${anime.status === "released" ? "text-green-500" : "text-red-500"}`}>
            {anime.status}
          </p>
        </div>
        <div className="flex gap-4 items-center mt-2">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="./episodes.svg"
              alt="episodes"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="text-base text-white font-semibold">
              {anime.episodes || anime.episodes_aired} episodes
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="./star.svg"
              alt="star"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-base font-semibold text-[#FFAD49]">{anime.score}</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm">Aired on: {anime.aired_on}</p>
        {anime.released_on && (
          <p className="text-gray-400 text-sm">Released on: {anime.released_on}</p>
        )}
      </div>
    </MotionDiv>
  );
}

export default AnimeCard;

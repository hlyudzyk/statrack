
"use client";

import { Carousel  } from "flowbite-react";
import {NewsSlide} from "@/app/components/news/NewsSlide";
import {useState} from "react";

interface NewsItem {
  id: number;
  header: string;
  author: string;
  content: string;
}

const NewsSlider = () => {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      header: 'New Tech Breakthrough in AI',
      author: 'Alice Johnson',
      content: 'Researchers have developed a new algorithm that significantly improves machine learning efficiency.',
    },
    {
      id: 2,
      header: 'Ukraine’s Reconstruction Plan',
      author: 'Dmytro H.',
      content: 'The government has announced a comprehensive plan to rebuild infrastructure and stimulate economic growth.',
    },
    {
      id: 3,
      header: 'SpaceX Launches New Satellite',
      author: 'Elon M.',
      content: 'A new generation of communications satellite has been launched, promising faster internet globally.',
    },
  ]);
  return (
      <div className="h-156 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          {news.map((item) => (
                <NewsSlide key={item.id} header={item.header} author={item.author} content={item.content} />
          ))}
        </Carousel>
      </div>
  );
}

export default NewsSlider;
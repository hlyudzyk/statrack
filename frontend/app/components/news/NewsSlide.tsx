interface NewsSlideProps {
  header: string;
  author: string;
  content: string;
}

export const NewsSlide = ({ header, author, content }: NewsSlideProps) => {
  return (
    <div className="flex h-full items-center justify-center bg-gray-300 dark:bg-gray-700 dark:text-white">
      <div className="flex flex-col max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">{header}</h1>
        <p className="text-sm mb-1 italic">By {author}</p>
        <p className="text-base">{content}</p>
      </div>
    </div>
  );
};
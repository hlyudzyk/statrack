import Users from "@/app/components/Users";
import NewsSlider from "@/app/components/news/NewsSlider";

export default function Home() {
  return (
      <div className="space-y-5">
        <Users/>
        <NewsSlider/>
      </div>
  )
}

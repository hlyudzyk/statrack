"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { UserStats} from "@/app/lib/types";


function parseDurationToMinutes(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const [, h = "0", m = "0", s = "0"] = match;
  return parseInt(h) * 60 + parseInt(m) + parseInt(s) / 60;
}

function secondsToHours(seconds: number) {
  return Math.round(seconds / 3600);
}

export default function StatsChart({ stats }: { stats: UserStats[] }) {
  const data = stats.map((stat) => ({
    username: stat.username,
    hours: secondsToHours(stat.totalOnlineTime),
  }));

  return (
      <div className="h-[400px] p-5">
        <h2 className="text-xl 3xl:text-5xl 3xl:mb-16 font-semibold mb-2">Загальний час присутності</h2>
        <ResponsiveContainer width="100%" height="100%" >
          <BarChart data={data}>
            <XAxis dataKey="username" className="3xl:text-4xl"/>
            <YAxis  className="3xl:text-4xl"/>
            <Tooltip labelClassName="3xl:text-4xl"/>
            <Bar dataKey="hours" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
  );
}

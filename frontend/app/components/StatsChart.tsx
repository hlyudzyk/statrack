"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { UserStats} from "@/app/lib/types";


function parseDurationToMinutes(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const [, h = "0", m = "0", s = "0"] = match;
  return parseInt(h) * 60 + parseInt(m) + parseInt(s) / 60;
}

function secondsToMinutes(seconds: number) {
  return Math.round(seconds / 60);
}

export default function StatsChart({ stats }: { stats: UserStats[] }) {
  console.log(stats)
  const data = stats.map((stat) => ({
    username: stat.username,
    minutesOnline: secondsToMinutes(stat.totalOnlineTime),
  }));

  return (
      <div className="w-full h-[400px]">
        <h2 className="text-xl font-semibold mb-2">Total Online Time (in minutes)</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="username" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="minutesOnline" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
  );
}

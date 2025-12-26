import React from 'react';
import { Award, Sparkles } from 'lucide-react';

interface StatsData {
  totalPlaces: number;
  totalCities: number;
  totalInteractions: number;
}

interface LevelData {
  currentLevel: number;
  levelName: string;
  currentExp: number;
  nextLevelExp: number;
  percentage: number;
}

interface MinimalStatsCardProps {
  stats: StatsData;
  level: LevelData;
}

export function MinimalStatsCard({ stats, level }: MinimalStatsCardProps) {
  return (
    <div className="space-y-3">
      {/* Level Card - Minimal & Flat */}
      <div className="relative px-4 py-3 bg-card/30 rounded-2xl">
        <div className="flex items-center justify-between gap-4">
          {/* Level Info - Compact */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-foreground/5 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-foreground/50" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-foreground/70">
                <span className="text-xs">Lv.{level.currentLevel}</span>
                <span className="text-sm">{level.levelName}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {level.currentExp} / {level.nextLevelExp} EXP
              </div>
            </div>
          </div>

          {/* Progress - Compact */}
          <div className="flex-1 max-w-[120px]">
            <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground/20 rounded-full transition-all duration-700"
                style={{ width: `${level.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Minimal */}
      <div className="grid grid-cols-3 gap-2.5">
        <StatItem value={stats.totalPlaces} label="地点" />
        <StatItem value={stats.totalCities} label="城市" />
        <StatItem value={stats.totalInteractions} label="互动" />
      </div>
    </div>
  );
}

interface StatItemProps {
  value: number;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border text-center hover:border-border/80 transition-colors">
      <div className="text-2xl text-foreground mb-1 tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
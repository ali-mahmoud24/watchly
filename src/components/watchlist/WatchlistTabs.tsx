import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

import type { WatchlistFilterKey } from '@/types/watchlist';

type Props = {
  filter: WatchlistFilterKey;
  setFilter: (f: WatchlistFilterKey) => void;
  counts: { all: number; watched: number; unwatched: number };
};

export default function WatchlistTabs({ filter, setFilter, counts }: Props) {
  const baseTrigger =
    "w-full flex items-center justify-center gap-1.5 rounded-sm " +
    "px-3 py-1.5 text-sm font-medium cursor-pointer transition-colors " +
    "data-[state=active]:bg-background data-[state=active]:shadow-sm " +
    "data-[state=active]:text-foreground " +
    "border border-transparent data-[state=active]:border-border"; // keeps height stable

  const badgeClass =
    "flex-shrink-0 text-xs px-1.5 py-0.5 leading-none rounded-sm";

  return (
    <Tabs
      value={filter}
      onValueChange={(val) => setFilter(val as WatchlistFilterKey)}
    >
      <TabsList className="grid w-full grid-cols-3 gap-1 bg-muted p-1 rounded-md">
        <TabsTrigger value="all" className={baseTrigger}>
          <span className="truncate">All</span>
          <Badge variant="secondary" className={badgeClass}>
            {counts.all}
          </Badge>
        </TabsTrigger>

        <TabsTrigger value="watched" className={baseTrigger}>
          <span className="truncate">Watched</span>
          <Badge variant="secondary" className={badgeClass}>
            {counts.watched}
          </Badge>
        </TabsTrigger>

        <TabsTrigger value="unwatched" className={baseTrigger}>
          <span className="truncate">Unwatched</span>
          <Badge variant="secondary" className={badgeClass}>
            {counts.unwatched}
          </Badge>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

import type { WatchlistFilterKey } from '@/types/watchlist';

type Props = {
  filter: WatchlistFilterKey;
  setFilter: (f: WatchlistFilterKey) => void;
  counts: { all: number; watched: number; unwatched: number };
};

export default function WatchlistTabs({ filter, setFilter, counts }: Props) {
  return (
    <Tabs
      value={filter}
      onValueChange={(val) => setFilter(val as WatchlistFilterKey)}
    >
      <TabsList className="grid w-full grid-cols-3 gap-2">
        <TabsTrigger value="all" className="w-full p-0 cursor-pointer">
          <div className="flex items-center justify-center gap-2 w-full min-w-0 px-3 py-2">
            <span className="truncate">All</span>
            <Badge variant="secondary" className="flex-shrink-0">
              {counts.all}
            </Badge>
          </div>
        </TabsTrigger>

        <TabsTrigger value="watched" className="w-full p-0 cursor-pointer">
          <div className="flex items-center justify-center gap-2 w-full min-w-0 px-3 py-2">
            <span className="truncate">Watched</span>
            <Badge variant="secondary" className="flex-shrink-0">
              {counts.watched}
            </Badge>
          </div>
        </TabsTrigger>

        <TabsTrigger value="unwatched" className="w-full p-0 cursor-pointer">
          <div className="flex items-center justify-center gap-2 w-full min-w-0 px-3 py-2">
            <span className="truncate">Unwatched</span>
            <Badge variant="secondary" className="flex-shrink-0">
              {counts.unwatched}
            </Badge>
          </div>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

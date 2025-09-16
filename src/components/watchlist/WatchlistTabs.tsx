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
      <TabsList className="grid w-full sm:w-96 grid-cols-3">
        <TabsTrigger value="all" className="cursor-pointer">
          All{' '}
          <Badge variant="secondary" className="ml-2">
            {counts.all}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="watched" className="cursor-pointer">
          Watched{' '}
          <Badge variant="secondary" className="ml-2 ">
            {counts.watched}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="unwatched" className="cursor-pointer">
          Unwatched{' '}
          <Badge variant="secondary" className="ml-2 ">
            {counts.unwatched}
          </Badge>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

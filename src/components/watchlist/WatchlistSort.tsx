import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import {
  ArrowUp,
  ArrowDown,
  ArrowUpAZ,
  ArrowDownAZ,
  Calendar,
  Clock,
} from 'lucide-react';
import type { WatchlistSortKey } from '@/types/watchlist';


type Props = {
  sortBy: WatchlistSortKey;
  setSortBy: (s: WatchlistSortKey) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (o: 'asc' | 'desc') => void;
};

export default function WatchlistSort({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: Props) {
  const arrow =
    sortOrder === 'asc' ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );

  const getIcon = () => {
    if (sortBy === 'title')
      return sortOrder === 'asc' ? <ArrowUpAZ /> : <ArrowDownAZ />;
    if (sortBy === 'year')
      return (
        <div className="flex items-center gap-1">
          <Calendar />
          {arrow}
        </div>
      );
    if (sortBy === 'recent')
      return (
        <div className="flex items-center gap-1">
          <Clock />
          {arrow}
        </div>
      );
    return null;
  };

  const getLabel = () => {
    const dir = sortOrder === 'asc' ? 'Ascending' : 'Descending';
    if (sortBy === 'title') return `Sort by Title (${dir})`;
    if (sortBy === 'year')
      return `Sort by Release Year (${
        sortOrder === 'asc' ? 'Oldest → Newest' : 'Newest → Oldest'
      })`;
    if (sortBy === 'recent')
      return `Sort by Recently Added (${
        sortOrder === 'asc' ? 'Oldest First' : 'Newest First'
      })`;
    return 'Sort';
  };

  return (
    <div className="flex items-center border rounded-lg overflow-hidden">
      <Select
        value={sortBy}
        onValueChange={(val) => setSortBy(val as typeof sortBy)}
      >
        <SelectTrigger className="w-36 border-0 rounded-none cursor-pointer">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent" className="cursor-pointer">
            Recently Added
          </SelectItem>
          <SelectItem value="title" className="cursor-pointer">
            Title (A–Z)
          </SelectItem>
          <SelectItem value="year" className="cursor-pointer">
            Release Year
          </SelectItem>
        </SelectContent>
      </Select>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="cursor-pointer">
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className={`flex items-center justify-center w-16 h-10 gap-1`}
            >
              {getIcon()}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{getLabel()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

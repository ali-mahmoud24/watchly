import { useState } from 'react';
import WatchlistItem from './WatchlistItem';
import SectionDivider from './SectionDivider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
import { Input } from '@/components/ui/input';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp,
  ArrowDown,
  ArrowUpAZ,
  ArrowDownAZ,
  Calendar,
  Clock,
} from 'lucide-react';

import { useWatchlistQuery } from '@/hooks/useWatchlist';

export default function Watchlist() {
  const [filter, setFilter] = useState<'all' | 'watched' | 'unwatched'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'recent'>('recent');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { data: watchlist, isLoading } = useWatchlistQuery();

  if (isLoading) return <p>Loading watchlist...</p>;
  if (!watchlist || watchlist.length === 0)
    return (
      <div className="max-w-2xl mx-auto px-4 mt-6">
        <p className="text-gray-500 text-center">
          No movies in your watchlist yet.
        </p>
      </div>
    );

  // Counts
  const watchedCount = watchlist.filter((m) => m.watched).length;
  const unwatchedCount = watchlist.filter((m) => !m.watched).length;
  const allCount = watchlist.length;

  // Filter by tab
  let filtered = watchlist.filter((movie) => {
    if (filter === 'watched') return movie.watched;
    if (filter === 'unwatched') return !movie.watched;
    return true;
  });

  // Filter by search
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (movie) =>
        movie.primaryTitle.toLowerCase().includes(query) ||
        (movie.originalTitle?.toLowerCase().includes(query) ?? false)
    );
  }

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc'
        ? a.primaryTitle.localeCompare(b.primaryTitle)
        : b.primaryTitle.localeCompare(a.primaryTitle);
    }
    if (sortBy === 'year') {
      return sortOrder === 'asc'
        ? (a.startYear ?? 0) - (b.startYear ?? 0)
        : (b.startYear ?? 0) - (a.startYear ?? 0);
    }
    if (sortBy === 'recent') {
      return sortOrder === 'asc'
        ? (a.addedAt ?? 0) - (b.addedAt ?? 0)
        : (b.addedAt ?? 0) - (a.addedAt ?? 0);
    }
    return 0;
  });

  // Helper icons
  const getSortIcon = () => {
    const arrow =
      sortOrder === 'asc' ? (
        <ArrowUp className="w-4 h-4" />
      ) : (
        <ArrowDown className="w-4 h-4" />
      );
    if (sortBy === 'title')
      return sortOrder === 'asc' ? (
        <ArrowUpAZ className="w-5 h-5" />
      ) : (
        <ArrowDownAZ className="w-5 h-5" />
      );
    if (sortBy === 'year')
      return (
        <div className="flex items-center gap-1">
          <Calendar className="w-5 h-5" />
          {arrow}
        </div>
      );
    if (sortBy === 'recent')
      return (
        <div className="flex items-center gap-1">
          <Clock className="w-5 h-5" />
          {arrow}
        </div>
      );
    return null;
  };

  const getSortLabel = () => {
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
    <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
      <SectionDivider label="Your Watchlist" />

      {/* Tabs + Search + Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Tabs */}
        <Tabs
          value={filter}
          onValueChange={(val) => setFilter(val as typeof filter)}
        >
          <TabsList className="grid w-full sm:w-96 grid-cols-3">
            <TabsTrigger value="all">
              All{' '}
              <Badge variant="secondary" className="ml-2">
                {allCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="watched">
              Watched{' '}
              <Badge variant="secondary" className="ml-2">
                {watchedCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unwatched">
              Unwatched{' '}
              <Badge variant="secondary" className="ml-2">
                {unwatchedCount}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search input */}
        <Input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs flex-1"
        />

        {/* Sorting */}
        <div className="flex items-center border rounded-lg overflow-hidden">
          <Select
            value={sortBy}
            onValueChange={(val) => setSortBy(val as typeof sortBy)}
          >
            <SelectTrigger className="w-36 border-0 rounded-none">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Added</SelectItem>
              <SelectItem value="title">Title (A–Z)</SelectItem>
              <SelectItem value="year">Release Year</SelectItem>
            </SelectContent>
          </Select>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() =>
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                  }
                  className={`flex items-center justify-center w-16 h-10 gap-1`}
                >
                  {getSortIcon()}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getSortLabel()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Animated Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${filter}-${searchQuery}-${sortBy}-${sortOrder}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filtered.length > 0 ? (
            filtered.map((movie) => (
              <motion.div
                key={movie.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <WatchlistItem movie={movie} />
              </motion.div>
            ))
          ) : (
            <motion.p
              key="empty"
              className="text-gray-500 text-center col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No {filter === 'all' ? '' : filter} movies found.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

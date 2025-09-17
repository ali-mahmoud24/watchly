import { Input } from '@/components/ui/input';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function WatchlistSearch({ value, onChange }: Props) {
  return (
    <div className="w-full min-w-0">
      <Input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}

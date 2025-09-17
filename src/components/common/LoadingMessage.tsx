import { Loader2 } from "lucide-react";

type LoadingMessageProps = {
  message?: string;
  size?: number; // optional, for customizing spinner size
};

export default function LoadingMessage({
  message = "Loading...",
  size = 16,
}: LoadingMessageProps) {
  return (
    <div className="p-3 text-gray-500 text-sm flex items-center gap-2">
      <Loader2
        className="animate-spin"
        style={{ width: size, height: size }}
      />
      <span>{message}</span>
    </div>
  );
}

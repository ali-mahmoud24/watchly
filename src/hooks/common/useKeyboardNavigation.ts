import { useCallback } from "react";

export function useKeyboardNavigation<T>(
  items: T[],
  highlightedIndex: number,
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>,
  onSelect: (item: T) => void
) {
  return useCallback(
    (e: React.KeyboardEvent) => {
      const length = items.length;
      if (length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((i) => (i + 1) % length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((i) => (i === 0 ? length - 1 : i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = items[highlightedIndex];
        if (item) onSelect(item);
      }
    },
    [items, highlightedIndex, onSelect, setHighlightedIndex]
  );
}

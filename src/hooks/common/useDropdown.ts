import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from './useClickOutside';

export function useDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useClickOutside(containerRef, () => setOpen(false));

  // Auto-focus input when dropdown opens
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  return { open, setOpen, containerRef, inputRef };
}

import { useState } from 'react';

export function useModal<T = null>() {
  const [data, setData] = useState<T | null>(null);
  const [open, setOpen] = useState(false);

  const openModal = (payload: T) => {
    setData(payload);
    setOpen(true);
  };

  const closeModal = () => {
    setData(null);
    setOpen(false);
  };

  return { data, open, openModal, closeModal };
}

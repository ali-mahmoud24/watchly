// components/common/ErrorMessage.tsx
export default function ErrorMessage({ message }: { message: string }) {
  return <div className="mt-2 text-red-500 text-sm text-center">{message}</div>;
}

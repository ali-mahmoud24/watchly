type Props = {
  label?: string;
};

export default function SectionDivider({ label }: Props) {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-gray-300" />
      </div>
      {label && (
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-sm text-gray-500">{label}</span>
        </div>
      )}
    </div>
  );
}

"use client";

type Props = {
  page: number;
  onPageChange: (page: number) => void;
  disableNext?: boolean;
};

export default function Pagination({ page, onPageChange, disableNext }: Props) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 rounded"
      >
        Previous
      </button>
      <span>Page {page}</span>
      <button
        disabled={disableNext}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 rounded"
      >
        Next
      </button>
    </div>
  );
}

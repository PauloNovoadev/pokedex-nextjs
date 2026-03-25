type SearchBarProps = {
  initialQuery?: string;
};

export default function SearchBar({ initialQuery = "" }: SearchBarProps) {
  return (
    <form action="/search" method="GET" className="w-80">
      <input
        type="search"
        name="q"
        defaultValue={initialQuery}
        placeholder="Pesquisar"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-gray-900 outline-none"
      />
    </form>
  );
}
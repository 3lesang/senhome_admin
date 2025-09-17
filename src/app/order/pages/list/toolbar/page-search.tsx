import SearchInput from "./search-input";

export default function PageListSearchInput() {
	const handleSearch = (q: string) => {
		console.log(q);
	};
	return <SearchInput onSearch={handleSearch} />;
}

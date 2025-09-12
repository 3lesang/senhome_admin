import SearchInput from "./search-input";

function PageListSearchInput() {
  const handleSearch = (q: string) => {
    console.log(q);
  };
  return <SearchInput onSearch={handleSearch} />;
}

export default PageListSearchInput;

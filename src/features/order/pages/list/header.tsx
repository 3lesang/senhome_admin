import ListPageToolbar from "./toolbar";

function ListPageHeader() {
  return (
    <div className="sticky top-0 z-50 bg-gray-50 pt-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-2xl">Quản lý đơn hàng</h3>
        </div>
        <ListPageToolbar />
      </div>
    </div>
  );
}

export default ListPageHeader;

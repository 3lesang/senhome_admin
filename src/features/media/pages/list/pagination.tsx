import { DynamicPagination } from "@/components/dynamic-pagination";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePageList } from "@/features/media/provider/list";

function ListPagePagination() {
  const { page, limit, data, setPage, setLimit } = usePageList();

  return (
    <div className="flex justify-between">
      <div className="flex w-full max-w-sm items-center gap-4">
        <Label htmlFor="limit" className="whitespace-nowrap">
          Số lượng
        </Label>
        <Select
          value={limit.toString()}
          onValueChange={(val) => {
            setLimit(Number(val));
            setPage(1);
          }}
        >
          <SelectTrigger id="limit" className="bg-white w-[120px]">
            <SelectValue placeholder="Chọn số lượng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <DynamicPagination
          page={page}
          totalItems={data?.totalItems ?? 0}
          perPage={limit}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default ListPagePagination;

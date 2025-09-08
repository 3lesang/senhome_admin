import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { PRODUCT_STATE } from "@/features/product/constants";
import { categoryMapHandler } from "@/features/product/handler/query/categories";
import { usePageList } from "@/features/product/provider/list";
import type { ProductDataType } from "@/features/product/types";
import { cn, convertToFileUrl } from "@/lib/utils";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Link } from "@tanstack/react-router";
import RowAction from "./action";

interface PageListTableRowProps {
  data: ProductDataType;
}

function PageListTableRow({ data }: PageListTableRowProps) {
  const { selected, setSelected } = usePageList();
  const { data: categories } = categoryMapHandler();

  const handleSelect = (checked: CheckedState) => {
    setSelected?.((prev) => ({ ...prev, [data.id]: checked as boolean }));
  };

  const checked = Boolean(selected?.[data.id]);
  const state = data?.deleted ? "draft" : "publish";

  return (
    <TableRow className={cn("group", checked && "bg-gray-50")}>
      <TableCell>
        <Checkbox checked={checked} onCheckedChange={handleSelect} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="size-10 rounded-md">
            <AvatarImage src={convertToFileUrl(data.expand.thumbnail)} />
            <AvatarFallback className="rounded-md"></AvatarFallback>
          </Avatar>
          <Link
            to="/product/$id"
            params={{ id: data.id }}
            className="hover:underline"
          >
            {data.name}
          </Link>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={state == "draft" ? "secondary" : "default"}>
          {PRODUCT_STATE[state].text}
        </Badge>
      </TableCell>
      <TableCell>{categories?.[data.category]?.name}</TableCell>
      <TableCell>
        <RowAction id={data?.id} />
      </TableCell>
    </TableRow>
  );
}

export default PageListTableRow;

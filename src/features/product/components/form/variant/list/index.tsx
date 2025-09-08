import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  VariantDataListType,
  VariantType,
} from "@/features/product/components/form/schema";
import React from "react";
import ComboRow from "./combo-row";

interface VariantProps {
  data?: VariantDataListType;
  onChange?: (data: VariantType) => void;
}

const Variant = ({ data = {}, onChange }: VariantProps) => {
  return (
    <Card className="shadow-none border-0">
      <CardHeader>
        <CardTitle>Danh sách phân loại</CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">Phân loại</TableHead>
            <TableHead>Ảnh</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Giảm giá</TableHead>
            <TableHead>Tồn kho</TableHead>
            <TableHead>SKU</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(data).map(([id, item]) => (
            <ComboRow key={id} data={item} onChange={onChange} />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default React.memo(Variant);

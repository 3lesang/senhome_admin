import FileInput from "@/components/media/file-input";
import type { FileType } from "@/components/media/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2Icon, XIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useCallback, useMemo, useState } from "react";

// ----------------- Types -----------------
interface OptionType {
  id: string;
  name: string;
}

interface SectionType {
  id: string;
  name: string;
  options: OptionType[];
}

interface ComboItem {
  id: string;
  name: string;
}

type ComboKey = string; // e.g. "opt1|opt2|opt3"

type CombinationDetails = Record<
  ComboKey,
  {
    price?: string;
    stock?: string;
    discount?: string;
    sku?: string;
    image?: FileType[];
  }
>;

// ----------------- Option Input -----------------
const OptionInput = ({
  value,
  onChange,
  onRemove,
}: {
  value: string;
  onChange: (val: string) => void;
  onRemove: () => void;
}) => (
  <div className="flex items-center gap-2">
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Nhập tùy chọn"
    />
    <Button variant="ghost" size="icon" type="button" onClick={onRemove}>
      <Trash2Icon />
    </Button>
  </div>
);

// ----------------- Section -----------------
const SectionCard = ({
  value,
  options,
  onValueChange,
  onOptionChange,
  onAddOption,
  onRemoveOption,
  onRemoveSection,
}: {
  value: string;
  options: OptionType[];
  onValueChange: (val: string) => void;
  onOptionChange: (idx: number, val: string) => void;
  onAddOption: () => void;
  onRemoveOption: (idx: number) => void;
  onRemoveSection: () => void;
}) => (
  <Card className="shadow-none border-0">
    <CardHeader className="flex justify-between items-center">
      <CardTitle>{value || "Phân loại"}</CardTitle>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={onRemoveSection}
      >
        <XIcon />
      </Button>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>Tên loại</Label>
        <Input
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="Tên loại (vd: Kích thước, Màu sắc)"
        />
      </div>

      <div className="grid w-full items-center gap-3">
        <Label>Tùy chọn</Label>
        {options.map((opt, idx) => (
          <OptionInput
            key={opt.id}
            value={opt.name}
            onChange={(val) => onOptionChange(idx, val)}
            onRemove={() => onRemoveOption(idx)}
          />
        ))}
      </div>
      <Button variant="outline" size="sm" type="button" onClick={onAddOption}>
        + Thêm tùy chọn
      </Button>
    </CardContent>
  </Card>
);

// ----------------- Combination Row -----------------
const CombinationRow = ({
  combo,
  comboKey,
  data,
  onChange,
}: {
  combo: ComboItem[];
  comboKey: ComboKey;
  data: CombinationDetails[string];
  onChange: (comboKey: ComboKey, value: CombinationDetails[string]) => void;
}) => {
  const fields: (keyof NonNullable<CombinationDetails[string]>)[] = [
    "price",
    "stock",
    "discount",
    "sku",
  ];

  const handleChange = (
    field: keyof CombinationDetails[string],
    value: string
  ) => onChange(comboKey, { ...data, [field]: value });

  return (
    <TableRow>
      <TableCell className="space-x-1">
        {combo.map((c) => (
          <Badge variant="outline" key={c.id} className="">
            {c.name}
          </Badge>
        ))}
      </TableCell>
      <TableCell>
        <FileInput
          mode="single"
          value={data?.image}
          onChange={(files) => onChange(comboKey, { ...data, image: files })}
          render={({ files, handleOpen, handleRemove }) => {
            if (files.length > 0) {
              return (
                <div className="h-16 w-16 rounded-md overflow-hidden relative group">
                  <img
                    src={files[0].url}
                    alt=""
                    className="w-full object-cover aspect-square"
                  />
                  <Button
                    className="hidden group-hover:flex absolute top-0 right-0 size-6 rounded-full"
                    variant="secondary"
                    size="icon"
                    onClick={() => handleRemove?.(files[0].id)}
                  >
                    <XIcon />
                  </Button>
                </div>
              );
            }
            return (
              <Button
                type="button"
                variant="ghost"
                className="border border-dashed size-16 p-8"
                onClick={handleOpen}
              >
                <span className="text-xs text-muted-foreground">Chọn ảnh</span>
              </Button>
            );
          }}
        />
      </TableCell>
      {fields.map((field) => (
        <TableCell key={field}>
          <Input
            value={data?.[field] as string}
            onChange={(e) => handleChange(field, e.target.value)}
            className="bg-white"
          />
        </TableCell>
      ))}
    </TableRow>
  );
};

// ----------------- Helpers -----------------
const generateCombinations = (sections: SectionType[]): ComboItem[][] => {
  const allOptions = sections
    .map((s) => s.options.filter((o) => o.name))
    .filter((opts) => opts.length > 0);

  if (allOptions.length === 0) return [];
  const result: ComboItem[][] = [];
  const build = (idx: number, current: ComboItem[]) => {
    if (idx === allOptions.length) {
      result.push(current);
      return;
    }
    for (const opt of allOptions[idx]) {
      build(idx + 1, [...current, { id: opt.id, name: opt.name }]);
    }
  };
  build(0, []);
  return result;
};

const getComboKey = (combo: ComboItem[]): ComboKey =>
  combo.map((c) => c.id).join("|");

// ----------------- Main Component -----------------
const ProductVariantSection = () => {
  const [sections, setSections] = useState<SectionType[]>([
    {
      id: "size",
      name: "Kích thước",
      options: [{ id: "39cm", name: "39cm" }],
    },
    {
      id: "color",
      name: "Màu sắc",
      options: [{ id: "red", name: "Đỏ" }],
    },
  ]);

  const [combinationDetails, setCombinationDetails] =
    useState<CombinationDetails>({
      "39cm|red": {
        price: "100000",
        stock: "10",
        discount: "0",
        sku: "SKU-39CM-RED",
      },
    });

  const combinations = useMemo(
    () => generateCombinations(sections),
    [sections]
  );

  // ---------- Handlers ----------
  const handleUpdateSection = (
    index: number,
    updater: (s: SectionType) => SectionType
  ) => {
    setSections((prev) => prev.map((s, i) => (i === index ? updater(s) : s)));
  };

  const handleUpdateValue = (sectionIdx: number, value: string) =>
    handleUpdateSection(sectionIdx, (s) => ({ ...s, name: value }));

  const handleUpdateOption = (
    sectionIdx: number,
    optIdx: number,
    value: string
  ) => {
    handleUpdateSection(sectionIdx, (s) => ({
      ...s,
      options: s.options.map((o, j) =>
        j === optIdx ? { ...o, name: value } : o
      ),
    }));
  };

  const handleAddOption = (sectionIdx: number) =>
    handleUpdateSection(sectionIdx, (s) => ({
      ...s,
      options: [...s.options, { id: nanoid(4), name: "" }],
    }));

  const handleRemoveOption = (sectionIdx: number, optIdx: number) =>
    handleUpdateSection(sectionIdx, (s) => ({
      ...s,
      options:
        s.options.length > 1
          ? s.options.filter((_, j) => j !== optIdx)
          : [{ id: nanoid(4), name: "" }],
    }));

  const handleAddSection = () =>
    setSections((prev) => [
      ...prev,
      {
        id: nanoid(4),
        name: "",
        options: [{ id: nanoid(4), name: "" }],
      },
    ]);

  const handleRemoveSection = (sectionIdx: number) =>
    setSections((prev) =>
      prev.length > 1
        ? prev.filter((_, i) => i !== sectionIdx)
        : [
            {
              id: nanoid(4),
              name: "",
              options: [{ id: nanoid(4), name: "" }],
            },
          ]
    );

  const handleUpdateCombinationDetails = useCallback(
    (comboKey: ComboKey, details: CombinationDetails[string]) => {
      setCombinationDetails((prev) => ({ ...prev, [comboKey]: details }));
    },
    []
  );

  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <SectionCard
          key={section.id}
          value={section.name}
          options={section.options}
          onValueChange={(val) => handleUpdateValue(idx, val)}
          onOptionChange={(optIdx, val) => handleUpdateOption(idx, optIdx, val)}
          onAddOption={() => handleAddOption(idx)}
          onRemoveOption={(optIdx) => handleRemoveOption(idx, optIdx)}
          onRemoveSection={() => handleRemoveSection(idx)}
        />
      ))}

      <Button onClick={handleAddSection} variant="ghost" type="button">
        + Thêm phân loại
      </Button>

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
              <TableHead>Tồn kho</TableHead>
              <TableHead>Giảm giá</TableHead>
              <TableHead>SKU</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {combinations.map((combo) => {
              const comboKey = getComboKey(combo);
              return (
                <CombinationRow
                  key={comboKey}
                  combo={combo}
                  comboKey={comboKey}
                  data={combinationDetails[comboKey]}
                  onChange={handleUpdateCombinationDetails}
                />
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ProductVariantSection;

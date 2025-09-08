import type { OptionNormalizeType } from "@/features/product/handler/mutation/normalize";
import {
  createOptionPocket,
  type CreateOptionPayload,
} from "@/features/product/pocketbase/option/create";

async function createOptionHandler(
  opts: OptionNormalizeType[],
  attributeIdMap: Record<string, string>
) {
  const optionIdMap: Record<string, string> = {};
  const attributeOptionIdMap: Record<string, string> = {};

  for (const opt of opts) {
    const payload: CreateOptionPayload = {
      name: opt.name,
      attribute: attributeIdMap[opt.attributeId],
    };
    const res = await createOptionPocket(payload);
    optionIdMap[opt.id] = res.id;
    attributeOptionIdMap[opt.id] = opt.attributeId;
  }

  return { optionIdMap, attributeOptionIdMap };
}

export { createOptionHandler };

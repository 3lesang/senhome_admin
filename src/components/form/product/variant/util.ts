export function generateCombinations(
	options: { values: { name: string }[] }[],
) {
	let result: string[][] = [[]];

	for (const opt of options) {
		if (!opt.values?.length) continue;
		const next: string[][] = [];
		for (const combo of result) {
			for (const val of opt.values) {
				const name = val.name.trim();
				if (name) next.push([...combo, name]);
			}
		}
		result = next;
	}

	if (result.length === 0 || result[0].length === 0) return [];

	return result.map((combo) => combo.join(","));
}

#!/usr/bin/env bun
import plugin from "bun-plugin-tailwind";
import path from "path";

const outdir = "./dist"
// clean dist
await Bun.$`rm -rf ${outdir}`;

const formatFileSize = (bytes: number): string => {
	const units = ["B", "KB", "MB", "GB"];
	let size = bytes;
	let unitIndex = 0;

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}

	return `${size.toFixed(2)} ${units[unitIndex]}`;
};

console.log("\n🚀 Starting build...\n");

const start = performance.now();

const build = await Bun.build({
	entrypoints: ["./index.html"],
	outdir,
	plugins: [plugin],
	// splitting: true,
	minify: true,
	target: "browser",
	sourcemap: "linked",
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
});

const end = performance.now();
const buildTime = (end - start).toFixed(2);

if (build.success) {
	for (const o of build.outputs) {
		console.log(
			` → ${path.relative(process.cwd(), o.path)}  (${o.kind}, ${formatFileSize(o.size)})`,
		);
	}
	console.log(`\n✅ Build completed in ${buildTime} ms\n`);
} else {
	console.error("❌ Build failed\n");
	for (const msg of build.logs) {
		console.error(msg.message);
	}
	process.exit(1);
}

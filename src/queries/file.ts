import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { FILE_QUERY_KEY } from "@/constants";
import { s3Client } from "@/s3";

type Params = {
	page: number;
	limit: number;
	query: string;
};

export function getFilesQueryOptions({ page, limit, query }: Params) {
	return queryOptions({
		queryKey: [FILE_QUERY_KEY, page, limit, query],
		queryFn: () => {
			const command = new ListObjectsV2Command({
				Bucket: "r2-bucket",
				Prefix: "media",
			});
			return s3Client.send(command);
		},
	});
}

export function getFilesInfinityQueryOptions() {
	return infiniteQueryOptions({
		queryKey: [FILE_QUERY_KEY],
		queryFn: () => {
			const command = new ListObjectsV2Command({
				Bucket: "r2-bucket",
				Prefix: "media",
			});
			return s3Client.send(command);
		},
		initialPageParam: 1,
		getNextPageParam: () => {
			return undefined;
		},
	});
}

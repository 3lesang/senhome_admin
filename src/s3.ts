import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
	region: "auto",
	endpoint: "https://8ae7761106ffa10af9974d820283e7f3.r2.cloudflarestorage.com",
	credentials: {
		accessKeyId: "fddff5e1edfe2f5a67c22fac0e557f4d",
		secretAccessKey:
			"bf729d035c2542d78307ca0c60cea1afd70c12ec26adb5f2690fd8eba6ab8a1f",
	},
	requestChecksumCalculation: "WHEN_REQUIRED",
});

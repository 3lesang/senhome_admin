import { PRODUCT_REVIEW_COLLECTION, pocketClient } from "@/pocketbase";

type CreateReviewPayload = {
	rating: number;
	content: string;
	user: string;
	product: string;
};

export function createReviewHandler(values: CreateReviewPayload) {
	return pocketClient.collection(PRODUCT_REVIEW_COLLECTION).create({
		rating: values.rating,
		content: values.content,
		user: values.user,
		product: values.product,
	});
}

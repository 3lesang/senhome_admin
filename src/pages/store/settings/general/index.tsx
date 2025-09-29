import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import StoreSettingForm, {
	type StoreSettingFormValuesType,
} from "@/components/store-form/info";
import StoreLocationForm, {
	type StoreLocationFormValuesType,
} from "@/components/store-form/location";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import { getStoreQueryOptions } from "@/handlers/store/query/one";
import { createStorePocket } from "@/pocketbase/store/create";
import {
	type UpdateStorePayload,
	updateStorePocket,
} from "@/pocketbase/store/update";

export default function StoreSettingsGeneral() {
	const { data } = useSuspenseQuery(getStoreQueryOptions());
	const infoRef = useRef<UseFormReturn<StoreSettingFormValuesType>>(null);
	const locationRef = useRef<UseFormReturn<StoreLocationFormValuesType>>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: (values: UpdateStorePayload) => {
			if (data?.id) {
				return updateStorePocket(data.id, values);
			}
			return createStorePocket(values);
		},
		onSuccess: () => {
			toast.success("Cập nhật thành công");
		},
	});

	const handleClick = () => {
		const infoForm = infoRef.current;
		if (!infoForm) return;
		infoForm.handleSubmit((infoValues) => {
			const locationForm = locationRef.current;
			if (!locationForm) return;
			locationForm.handleSubmit((locationValues) => {
				const payload: UpdateStorePayload = {
					name: infoValues.name,
					description: infoValues.description ?? "",
					phone: infoValues.phone,
					email: infoValues.email,
					location: locationValues,
				};
				mutate(payload);
			})();
		})();
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Cấu hình cửa hàng</CardTitle>
				<CardDescription>Cấu hình thông tin chung của cửa hàng</CardDescription>
			</CardHeader>
			<CardContent className="space-y-8">
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>Thông tin cửa hàng</CardTitle>
						<CardDescription>
							Tên cửa hàng xuất hiện trên cửa hàng của bạn.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<StoreSettingForm
							ref={infoRef}
							defaultValues={{
								name: data?.name ?? "",
								description: data?.description ?? "",
								phone: data?.phone ?? "",
								email: data?.email ?? "",
							}}
						/>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>Nhận dạng thương hiệu</CardTitle>
						<CardDescription>
							Nơi quản lý tất cả các tài sản liên quan đến thương hiệu của cửa
							hàng, giúp đảm bảo tất cả những nơi sử dụng dữ liệu này đều có sự
							nhất quán về hình ảnh và nội dung.
						</CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>Địa chỉ cửa hàng</CardTitle>
						<CardDescription>
							Địa chỉ này sẽ xuất hiện trên hoá đơn của bạn và sẽ được sử dụng
							để tính toán mức giá vận chuyển của bạn.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<StoreLocationForm
							ref={locationRef}
							defaultValues={data.location}
						/>
					</CardContent>
				</Card>
			</CardContent>
			<CardFooter className="flex justify-end">
				<LoadingButton type="button" onClick={handleClick} loading={isPending}>
					Cập nhật
				</LoadingButton>
			</CardFooter>
		</Card>
	);
}

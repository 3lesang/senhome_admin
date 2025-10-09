import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { StoreSettingFormValuesType } from "@/components/form/store/info";
import StoreSettingForm from "@/components/form/store/info";
import type { StoreLocationFormValuesType } from "@/components/form/store/location";
import StoreLocationForm from "@/components/form/store/location";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function StoreSettingsGeneral() {
	const infoRef = useRef<UseFormReturn<StoreSettingFormValuesType>>(null);
	const locationRef = useRef<UseFormReturn<StoreLocationFormValuesType>>(null);

	const handleClick = () => {
		infoRef.current?.handleSubmit((infoValues) => {
			console.log(infoValues);
			locationRef.current?.handleSubmit((locationValues) => {
				console.log(locationValues);
			})();
		})();
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Cấu hình cửa hàng</CardTitle>
				<CardDescription>Cấu hình thông tin chung của cửa hàng</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>Thông tin cửa hàng</CardTitle>
						<CardDescription>
							Tên cửa hàng xuất hiện trên cửa hàng của bạn.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<StoreSettingForm ref={infoRef} />
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
						<StoreLocationForm ref={locationRef} />
					</CardContent>
				</Card>
			</CardContent>
			<CardFooter className="flex justify-end">
				<Button type="button" onClick={handleClick}>
					Lưu
				</Button>
			</CardFooter>
		</Card>
	);
}

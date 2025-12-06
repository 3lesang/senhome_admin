import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { PlusIcon, Trash2Icon, XIcon } from "lucide-react";
import { type ReactNode, useState } from "react";
import axiosClient from "@/axios";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PRODUCT_QUERY_KEY } from "@/constants";
import { cn, convertToFileUrl } from "@/lib/utils";

type ProductData = {
	id: number;
	name: string;
	file?: string;
};

type HotspotData = {
	id: number;
	x: number;
	y: number;
	product?: ProductData;
};

interface ProductDialogProps {
	children: ReactNode;
	onSelect?: (value: ProductData) => void;
}

type ProductResponse = {
	data: ProductData[];
};

function ProductDialog({ children, onSelect }: ProductDialogProps) {
	const [open, setOpen] = useState(false);
	const getProductsQuery = useQuery({
		queryKey: [PRODUCT_QUERY_KEY],
		queryFn: async () => {
			return axiosClient.get<ProductResponse>("/products");
		},
	});

	function handleSelect(item: ProductData) {
		onSelect?.(item);
		setOpen(false);
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chọn sản phẩm</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				{getProductsQuery.data?.data.data.map((item) => (
					<Button
						key={item.id}
						type="button"
						variant="ghost"
						onClick={() => handleSelect(item)}
						className="justify-start whitespace-normal"
					>
						{item.file && (
							<Avatar className="rounded-md">
								<AvatarImage
									src={convertToFileUrl(item.file)}
									alt=""
								></AvatarImage>
							</Avatar>
						)}
						<p className="line-clamp-1">{item.name}</p>
					</Button>
				))}
			</DialogContent>
		</Dialog>
	);
}

interface SpotInputProps {
	value?: HotspotData[];
	onChange?: (value: HotspotData[]) => void;
	children: ReactNode;
}

export function SpotInput({ value, onChange, children }: SpotInputProps) {
	const [hotspots, setHotspots] = useState<HotspotData[]>(value ?? []);
	const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;
		const newSpot = {
			id: Date.now(),
			x: Number(x.toFixed(2)),
			y: Number(y.toFixed(2)),
		};
		setHotspots((prev) => [...prev, newSpot]);
	};

	function handleRemoveSpot(id: number) {
		const spots = hotspots.filter((spot) => spot.id !== id);
		onChange?.(spots);
		setHotspots(spots);
	}

	function handleAddProduct(id: number, value: ProductData) {
		const spots = hotspots.map((i) =>
			i.id === id ? { ...i, product: value } : i,
		);
		onChange?.(spots);
		setHotspots(spots);
	}

	function handleRemoveProduct(id: number) {
		const spots = hotspots.map((i) =>
			i.id === id ? { ...i, product: undefined } : i,
		);
		onChange?.(spots);
		setHotspots(spots);
	}

	return (
		<div className="relative">
			{/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
			{/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div className="w-full cursor-crosshair" onClick={handleClick}>
				{children}
			</div>
			{hotspots.map((spot) => (
				<div
					key={spot.id}
					className="absolute group"
					// biome-ignore lint/style/useTemplate: <explanation>
					style={{ left: spot.x + "%", top: spot.y + "%" }}
				>
					<HoverCard>
						<HoverCardTrigger asChild>
							<button
								type="button"
								className="flex items-center justify-center bg-blue-500 rounded-full cursor-pointer"
							>
								<PlusIcon className="text-white size-4" />
							</button>
						</HoverCardTrigger>
						<HoverCardContent>
							{spot.product?.id ? (
								<ButtonGroup className="w-full">
									<Link
										to="/products/$id/update"
										params={{ id: spot.product.id.toString() }}
										className={cn(
											buttonVariants({ variant: "ghost" }),
											"hover:underline whitespace-normal w-44",
										)}
									>
										{spot.product.file && (
											<Avatar>
												<AvatarImage
													src={convertToFileUrl(spot.product?.file)}
												></AvatarImage>
											</Avatar>
										)}
										<p className="line-clamp-1">{spot.product.name}</p>
									</Link>
									<Button
										variant="ghost"
										type="button"
										onClick={() => handleRemoveProduct(spot.id)}
									>
										<XIcon />
									</Button>
								</ButtonGroup>
							) : (
								<ProductDialog
									onSelect={(value) => handleAddProduct(spot.id, value)}
								>
									<Button type="button" variant="ghost" className="w-full">
										Thêm sản phẩm
										<PlusIcon />
									</Button>
								</ProductDialog>
							)}

							<Button
								variant="ghost"
								type="button"
								className="w-full"
								onClick={() => handleRemoveSpot(spot.id)}
							>
								<Trash2Icon />
								Xóa
							</Button>
						</HoverCardContent>
					</HoverCard>
				</div>
			))}
		</div>
	);
}

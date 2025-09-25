import {
	BellIcon,
	LogOutIcon,
	MoreVerticalIcon,
	UserCircleIcon,
} from "lucide-react";
import SettingsDialog from "@/components/settings-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import pocketClient from "@/pocketbase/client";

export default function FooterSidebar() {
	const user = {
		name: pocketClient.authStore.record?.name,
		email: pocketClient.authStore.record?.email,
		avatar: "https://github.com/shadcn.png",
	};
	return (
		<SidebarFooter>
			<SidebarMenu>
				<SettingsDialog />
				<SidebarMenuItem>
					<SidebarMenuButton>
						<BellIcon />
						<span className="select-none">Thông báo</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton size="lg">
								<Avatar className="rounded-lg select-none">
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className="rounded-lg">CN</AvatarFallback>
								</Avatar>
								<span className="truncate font-medium select-none">
									{user.name}
								</span>
								<MoreVerticalIcon className="ml-auto size-4" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
							<DropdownMenuItem>
								<UserCircleIcon />
								<span className="text-muted-foreground truncate text-xs">
									{user.email}
								</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<LogOutIcon />
								<span className="select-none">Đăng xuất</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}

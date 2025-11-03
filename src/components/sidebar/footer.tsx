import {
	BellIcon,
	LogOutIcon,
	MoreVerticalIcon,
	UserCircleIcon,
} from "lucide-react";
import SettingsDialog from "@/components/dialog/setting";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

export default function FooterSidebar() {
	const user = {
		name: "Sang Le",
		email: "3lesang@gmail.com",
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
								<Avatar>
									<AvatarFallback>CN</AvatarFallback>
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

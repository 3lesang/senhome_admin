import { Sidebar } from "@/components/ui/sidebar";
import ContentSidebar from "./content";
import FooterSidebar from "./footer";
import HeaderSidebar from "./header";

export default function AppSidebar() {
	return (
		<Sidebar className="border-none">
			<HeaderSidebar />
			<ContentSidebar />
			<FooterSidebar />
		</Sidebar>
	);
}

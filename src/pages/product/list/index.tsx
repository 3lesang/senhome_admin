import ListPageBody from "./body";
import DeleteDialog from "./delete-dialog";
import ListPageHeader from "./header";

export default function ProductListPage() {
	return (
		<>
			<ListPageHeader />
			<ListPageBody />
			<DeleteDialog />
		</>
	);
}

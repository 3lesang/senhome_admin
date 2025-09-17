import ListPageBody from "./body";
import DeleteDialog from "./delete-dialog";
import ListPageHeader from "./header";

export default function CategoryListPage() {
	return (
		<>
			<ListPageHeader />
			<ListPageBody />
			<DeleteDialog />
		</>
	);
}

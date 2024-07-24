import Link from "next/link";
import ViewUsers from "./components/ViewUsers";

export default function Home() {
	return (
		<div className="h-screen justify-center items-center">
			<div></div>
			<div className="flex flex-col items-center mt-3 scroll-py-5">
				<Link href="/user">[新しい投稿]</Link>
			</div>
			<ViewUsers />
			<div>aaa</div>
		</div>
	);
}

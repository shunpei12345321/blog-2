"use client";

import EditUser from "@/app/components/EditUser";
import Link from "next/link";

// eslint-disable-next-line @next/next/no-async-client-component
const RecordPage = async () => {
	return (
		<div className="conatiner m-auto">
			<div className="flex items-center justify-between h-screen">
				<EditUser />
				<div className="flex flex-col w-1/2 items-center justify-center">
					<h1 className="text-5xl font-bold flex-grow text-center">
						Edit Blog
					</h1>

					<Link href="/">[ホームに戻る]</Link>
				</div>
			</div>
		</div>
	);
};

export default RecordPage;

"use client";
import { UserType } from "@/app/api/user/type";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewUsers = () => {
	const [users, setUsers] = useState<UserType[]>([]);
	const [reload, setReload] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchUsers = async () => {
			setIsLoading(true);
			{
				const res = await fetch("/api/user/");
				const users = await res.json();
				setUsers(users);
			}
			setIsLoading(false);
		};
		fetchUsers();
	}, [reload]);

	const handleReload = () => {
		setReload(!reload);
	};

	return (
		<div className="flex flex-col items-center scroll-py-5">
			<div className="flex justify-between mb-5">
				<p className="text-center font-bold text-3xl">blog table</p>

				{isLoading ? (
					<p>Reloading...</p>
				) : (
					<button
						onClick={handleReload}
						type="button"
						className="bg-blue-500 text-white px-2 py-1">
						Reload
					</button>
				)}
			</div>
			<div className="w-2/3  px-4 py-2 border rounded-lg border-gray-700">
				{users.map((user) => (
					<Link
						key={user.id}
						href={`/user/edit/${user.id}`}
						className="flex border-2 w-full px-2 py-1">
						{JSON.stringify(user)}
					</Link>
				))}
			</div>

			{/* 7.23 17:36分 */}
			{/* <div>
				<div className="flex flex-col items-center scroll-py-5">
					<h1 className="font-bold text-5xl pt-10 pb-5">my Blogs</h1>
					<p className="px-20">
						ここは日々の経験や感じたことを自由に書き留めることができます。このブログはあなたのプライベートな日記帳のようなものです。
					</p>
					<Link
						href="/blog/create"
						className=" px-4 py-2 border-2 bg-black text-white rounded-full">
						new BLOG
					</Link>

					<div className="w-full space-y-4 flex flex-col items-center pb-10 mt-5">
						<div className="w-2/3 px-4 py-2 border rounded-lg border-gray-700">
							<div className="flex justify-between">
								<h1 className="font-bold text-xl"> aaa</h1>
								<div className="space-x-2">
									<Link
										href="/blog/create"
										className="px-5 py-1 bg-black text-white rounded-full text-sm">
										edit
									</Link>
									<button
										onClick={() => handleDelete(blog)}
										className="px-3 py-1 bg-red-600 text-white rounded-full text-sm">
										delete
									</button>
								</div>
							</div>
							<h2 className="text-sm border-b-2">{}</h2>

							<div className="p-4">{}</div>
						</div>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default ViewUsers;

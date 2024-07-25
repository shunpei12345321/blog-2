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
			<div className="flex justify-between  mb-5">
				<p className="text-center mr-3 font-bold text-3xl">blog table</p>

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
			<div className="w-2/3  px-4 py-2 space-y-4 flex flex-col items-center pb-10 mt-5 border rounded-lg border-gray-700">
				{/* 1111111 */}
				<div className="w-full space-y-4 flex flex-col items-center pb-10 mt-5">
					{users.map((users: UserType) => (
						<div
							key={users.id}
							className="w-2/3 px-4 py-2 border rounded-lg border-gray-700">
							<div className="flex justify-between">
								<h1 className="font-bold text-xl">{users.name}</h1>
								<div className="space-x-2">
									<Link
										href={`/user/edit/${users.id}`}
										className="px-5 py-1 bg-black text-white rounded-full text-sm">
										edit
									</Link>
								</div>
							</div>
							<h2 className="text-sm border-b-2"></h2>

							<div className="p-4">{users.email}</div>
						</div>
					))}
				</div>
				{/* この下は */}

				{/* {users.map((user: UserType) => (
					<Link
						key={user.id}
						href={`/user/edit/${user.id}`}
						className="flex border-2 rounded-lg border-gray-700 w-full px-2 py-1">
						{JSON.stringify(user)}
					</Link>
				))} */}
			</div>
		</div>
	);
};

export default ViewUsers;

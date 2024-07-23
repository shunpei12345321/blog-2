"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditUser = () => {
	const id = useParams<{ id: string }>().id;
	const router = useRouter();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			setIsFetching(true);
			{
				const res = await fetch(`/api/user/${parseInt(id)}`);
				const user = await res.json();
				setName(user.name);
				setEmail(user.email);
			}
			setIsFetching(false);
		};
		fetchUser();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsFetching(true);
		{
			const res = await fetch(`/api/user/${parseInt(id)}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id, name, email }),
			});
			const user = await res.json();
		}
		setIsFetching(false);

		router.push("/");
		router.refresh();
	};

	const handleDelete = async () => {
		const res = await fetch(`/api/user/${parseInt(id)}`, {
			method: "DELETE",
		});
		const user = await res.json();

		router.push("/");
		router.refresh();
	};

	return (
		<div className="flex flex-col space-y-10 w-1/2 p-10 items-center">
			<form className="border-2 w-2/3 p-5">
				<p className="text-center font-bold">Form (EditUser.tsx)</p>
				<div className="mb-4">
					<label htmlFor="id" className="mb-2">
						ID: #{id}
					</label>
				</div>
				<div className="flex flex-col mb-4">
					<label htmlFor="name" className="mb-2">
						Name
					</label>
					<input
						onChange={(event) => {
							setName(event.target.value);
						}}
						type="text"
						name="name"
						id="name"
						value={name}
						className="border-2 p-2"
					/>
				</div>
				<div className="flex flex-col mb-4">
					<label htmlFor="email" className="mb-2">
						Email
					</label>
					<input
						onChange={(event) => {
							setEmail(event.target.value);
						}}
						type="email"
						name="email"
						id="email"
						value={email}
						className="border-2 p-2"
					/>
				</div>
				<div className="flex items-center justify-between">
					{isFetching ? (
						<p>Updating...</p>
					) : (
						<button
							type="button"
							onClick={handleSubmit}
							className="bg-blue-500 text-white px-2 py-1">
							Submit
						</button>
					)}
					<button
						type="button"
						onClick={handleDelete}
						className="bg-red-500 text-white px-2 py-1">
						Delete
					</button>
				</div>
			</form>

			{isFetching ? (
				<p className="text-center">Fetching...</p>
			) : (
				<div className="flex flex-col w-full">
					<p className="font-bold">REST-API Payload:</p>
					<div className="border-2 items-center justify-center p-5 overflow-auto whitespace-normal">
						{JSON.stringify({ name, email })}
					</div>
				</div>
			)}
		</div>
	);
};

export default EditUser;

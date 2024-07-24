"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const NewUser = () => {
	const router = useRouter();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isFetching, setIsFetching] = useState(false);

	const handleSubmit = async () => {
		setIsFetching(true);
		{
			const response = await fetch("/api/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email }),
			});
			const data = await response.json();
		}
		setIsFetching(false);

		router.push("/");
		router.refresh();
	};

	return (
		<div className="flex flex-col space-y-10 w-1/2 p-10 items-center">
			<form className="border-2 w-2/3 p-5">
				<p className="text-center font-bold">Form (NewUser.tsx)</p>
				<div className="flex flex-col mb-4">
					<label htmlFor="name" className="mb-2">
						タイトル
					</label>
					<input
						onChange={(e) => {
							setName(e.target.value);
						}}
						type="text"
						name="name"
						id="name"
						className="border-2 p-2"
					/>
				</div>
				<div className="flex flex-col mb-4">
					<label htmlFor="email" className="mb-2">
						内容
					</label>
					<textarea
						onChange={(event) => {
							setEmail(event.target.value);
						}}
						placeholder="Blog内容を入力" // ブランクアウト
						value={email}
						name="email"
						id="email"
						className="border-2 p-2"
					/>
					{/* この形でテキストエリアを設定できる */}
				</div>
				{isFetching ? (
					<p className="text-center">Creating...</p>
				) : (
					<button
						type="button"
						onClick={handleSubmit}
						className="px-5 py-1 border-2 rounded-lg text-green-800 border-green-700 bg-green-100 ">
						投稿
					</button>
				)}
			</form>
		</div>
	);
};

export default NewUser;

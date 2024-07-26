'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditUser = () => {
  const id = useParams<{ id: string }>().id;
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name, email }),
      });
      const user = await res.json();
    }
    setIsFetching(false);

    router.push('/');
    router.refresh();
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/user/${parseInt(id)}`, {
      method: 'DELETE',
    });
    const user = await res.json();

    router.push('/');
    router.refresh();
  };

  return (
    <div className='flex flex-col rounded-lg space-y-10 w-1/2 p-10 items-center'>
      <form className='border-2  border-gray-700 w-2/3 p-5'>
        <p className='text-center font-bold'>Form (EditUser.tsx)</p>
        <div className='mb-4'>
          <label htmlFor='id' className='mb-2'>
            ID: #{id}
          </label>
        </div>
        <div className='flex flex-col mb-4'>
          <label htmlFor='name' className='mb-2'>
            タイトル
          </label>
          <form action=''></form>
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            type='text'
            name='name'
            id='name'
            value={name}
            className='border-2 p-2'
          />
        </div>

        <div className='flex flex-col mb-4'>
          <label htmlFor='email' className='mb-2'>
            内容
          </label>

          <textarea
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder='Blog内容を入力' // ブランクアウト
            value={email}
            name='email'
            id='email'
            className='border-2 p-2'
          />
        </div>
        <div className='flex items-center justify-between'>
          {isFetching ? (
            <p>Updating...</p>
          ) : (
            <button
              type='button'
              onClick={handleSubmit}
              className='px-5 py-1 border-2 rounded-lg text-green-800 border-green-700 bg-green-100'
            >
              修正投稿
              {/* エンター押すとおかしくなる */}
            </button>
          )}
          <button type='button' onClick={handleDelete} className='bg-red-500 text-white px-2 py-1'>
            削除
          </button>
        </div>
      </form>

      {/* 7.24 6:54 */}
    </div>
  );
};

export default EditUser;

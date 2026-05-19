'use client';

import { useEffect, useState } from 'react';
import css from './EditProfilePage.module.css';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfile() {
  const setUser = useAuthStore(state => state.setUser);

  const router = useRouter();

  const [username, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    getMe().then(user => {
      console.log('user', user);
      setAvatar(user.avatar ?? '');
      setEmail(user.email ?? '');
      setUserName(user.username ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // 1. Оновлюємо ім'я на сервері
      const updatedUser = await updateMe({ username });
      // 2. Оновлюємо глобальне сховище Zustand
      if (updatedUser) {
        // Якщо бекенд повертає оновленого користувача у відповідь
        setUser(updatedUser);
      } else {
        // Якщо бекенд не повертає об'єкт, збираємо його власноруч із новим username
        setUser({
          username,
          avatar,
          email,
        });
      }
      // 3. Освіжаємо серверні компоненти Next.js та робимо редірект
      router.refresh();
      router.push('/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {avatar && (
          <Image
            src={avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            loading="eager"
          />
        )}

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              value={username}
              onChange={handleChange}
              id="username"
              type="text"
              className={css.input}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button onClick={handleCancel} type="button" className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

'use client';

import Link from 'next/link';
import css from './Home.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function Header() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link href="/notes/filter/all">Notes</Link>
            </li>
          )}
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authorization | NoteHub',
  description: 'Sign in and sign up page for the NoteHub system',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

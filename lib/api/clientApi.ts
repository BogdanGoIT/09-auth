import { User } from '@/types/user';
import type { CreateNoteProps, Note } from '../../types/note';
import { nextServer } from './api';

export interface NotesResponse {
  notes: Note[];
  totalPages?: number;
}

export async function fetchNotes(page: number = 1, search?: string, tag?: string) {
  const res = await nextServer.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
  });
  return res.data;
}

// POST /notes {}

export async function createNote(newNote: CreateNoteProps) {
  const res = await nextServer.post<Note>('/notes', newNote);

  return res.data;
}

// DELETE /notes/{id}

export async function deleteNote(noteId: string) {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);

  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await nextServer.get<Note>(`/notes/${id}`);

  return res.data;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

// export type User = {
//   id: string;
//   email: string;
//   userName?: string;
//   photoUrl?: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

// browser > nextServer > beckend
export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};

import { User } from '@/types/user';
import type { CreateNoteProps, Note } from '../../types/note';
import { nextServer } from './api';

// const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// console.log(token);

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
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
  return res.data;
}

// POST /notes {}

export async function createNote(newNote: CreateNoteProps) {
  const res = await nextServer.post<Note>('/notes', newNote, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

  return res.data;
}

// DELETE /notes/{id}

export async function deleteNote(noteId: string) {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

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

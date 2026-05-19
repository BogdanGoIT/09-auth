import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';
// import { fetchNoteById } from '@/lib/api/clientApi';
import { fetchServerNoteById } from '@/lib/api/serverApi';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  // Розгортаємо params
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}

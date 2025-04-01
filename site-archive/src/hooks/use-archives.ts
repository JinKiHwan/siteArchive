import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useArchiveStore } from '@/store/archive-store';

interface Archive {
    id: string;
    title: string;
    description?: string;
    platform: string;
    content: any;
    tags: { id: string; name: string }[];
}

interface CreateArchiveInput {
    title: string;
    description?: string;
    platform: string;
    content: any;
    tags: string[];
}

export function useArchives() {
    const queryClient = useQueryClient();
    const setLoading = useArchiveStore((state) => state.setLoading);
    const setError = useArchiveStore((state) => state.setError);
    const setArchives = useArchiveStore((state) => state.setArchives);
    const filters = useArchiveStore((state) => state.filters);

    // 아카이브 목록 가져오기
    const { data, isLoading, error } = useQuery({
        queryKey: ['archives', filters],
        queryFn: async () => {
            // URL 쿼리 파라미터 구성
            const params = new URLSearchParams();
            if (filters.platform) params.append('platform', filters.platform);
            if (filters.searchTerm) params.append('search', filters.searchTerm);
            if (filters.tag) params.append('tag', filters.tag);

            const queryString = params.toString();
            const url = `/api/archives${queryString ? `?${queryString}` : ''}`;

            const response = await fetch(url);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to fetch archives');
            }
            return response.json() as Promise<Archive[]>;
        },
        onSuccess: (data) => {
            setArchives(data);
        },
        onError: (err: Error) => {
            setError(err.message);
        },
    });

    // 새 아카이브 생성
    const createArchive = useMutation({
        mutationFn: async (input: CreateArchiveInput) => {
            const response = await fetch('/api/archives', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create archive');
            }

            return response.json() as Promise<Archive>;
        },
        onSuccess: () => {
            // 성공 시 캐시 무효화 및 재요청
            queryClient.invalidateQueries({ queryKey: ['archives'] });
        },
    });

    // 아카이브 삭제
    const deleteArchive = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/archives/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to delete archive');
            }

            return id;
        },
        onSuccess: () => {
            // 성공 시 캐시 무효화 및 재요청
            queryClient.invalidateQueries({ queryKey: ['archives'] });
        },
    });

    return {
        archives: data || [],
        isLoading,
        error: error instanceof Error ? error.message : null,
        createArchive,
        deleteArchive,
    };
}

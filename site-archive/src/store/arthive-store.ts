import { create } from 'zustand';

interface Archive {
    id: string;
    title: string;
    description?: string;
    platform: string;
    content: any;
    tags: { id: string; name: string }[];
}

interface ArchiveFilters {
    platform?: string;
    searchTerm?: string;
    tag?: string;
}

interface ArchiveStore {
    archives: Archive[];
    selectedArchive: Archive | null;
    filters: ArchiveFilters;
    isLoading: boolean;
    error: string | null;

    // Actions
    setArchives: (archives: Archive[]) => void;
    selectArchive: (archive: Archive | null) => void;
    setFilters: (filters: Partial<ArchiveFilters>) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useArchiveStore = create<ArchiveStore>((set) => ({
    archives: [],
    selectedArchive: null,
    filters: {},
    isLoading: false,
    error: null,

    setArchives: (archives) => set({ archives }),
    selectArchive: (archive) => set({ selectedArchive: archive }),
    setFilters: (filters) =>
        set((state) => ({
            filters: { ...state.filters, ...filters },
        })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));

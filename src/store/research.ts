import { create } from 'zustand';

interface ResearchState {
  topic: string;
  isLoading: boolean;
  progress: number;
  activeAgent: string | null;
  setTopic: (topic: string) => void;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setActiveAgent: (agent: string | null) => void;
}

export const useResearchStore = create<ResearchState>((set) => ({
  topic: '',
  isLoading: false,
  progress: 0,
  activeAgent: null,
  setTopic: (topic) => set({ topic }),
  setLoading: (loading) => set({ isLoading: loading }),
  setProgress: (progress) => set({ progress }),
  setActiveAgent: (agent) => set({ activeAgent: agent }),
}));
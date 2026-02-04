import { create } from 'zustand';

type AppStore = {
  auth: boolean;
  setAuth: (v: boolean) => void;

  currentFile: string;
  setCurrentFile: (v: string) => void;

  needSave: boolean;
  setNeedSave: (v: boolean) => void;

  onSave: () => Promise<void>;
  setOnSave: (v: () => Promise<void>) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  auth: false,
  setAuth: (auth) => set({ auth }),

  currentFile: 'main',
  setCurrentFile: (currentFile) => set({ currentFile }),

  needSave: false,
  setNeedSave: (needSave) => set({ needSave }),

  onSave: async () => {},
  setOnSave: (onSave: () => Promise<void>) => set({ onSave }),
}));

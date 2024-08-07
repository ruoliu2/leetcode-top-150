import { create } from 'zustand';
import topics from '../../../public/data/top150.json';
import { Filter, top150State, initFilter } from '../components/constants';

const useTop150Store = create<top150State>((set) => ({
  filter: initFilter,
  questionSelection: (() => {
    const defaultSelection: { [key: string]: boolean } = {};
    Object.entries(topics).forEach(([topic, questions]) => {
      questions.forEach(([name, link, difficulty]) => {
        defaultSelection[name] = true;
      });
    });
    return defaultSelection;
  })(),
  setFilter: (newFilter) => set({ filter: newFilter }),
  setQuestionSelection: (newSelection) => set({ questionSelection: newSelection }),
  toggleQuestionSelection: (name) =>
    set((state) => ({
      questionSelection: { ...state.questionSelection, [name]: !state.questionSelection[name] },
    })),
  resetQuestionSelection: () =>
    set((state) => {
      const newSelection: { [key: string]: boolean } = {};
      Object.entries(topics).forEach(([topic, questions]) => {
        questions.forEach(([name, link, difficulty]) => {
          newSelection[name] = true;
        });
      });
      return { questionSelection: newSelection };
    }),
  clearSelection: () =>
    set((state) => {
      const newSelection: { [key: string]: boolean } = {};
      Object.keys(state.questionSelection).forEach((name) => {
        newSelection[name] = false;
      });
      return { questionSelection: newSelection };
    }),
}));

export default useTop150Store;

import { useProgressStore } from "../store/progress";

const guard = (id: string) => {
  const currentLesson = useProgressStore((state) => state.currentLesson);
  return Number(id) <= currentLesson;
};

export default guard;

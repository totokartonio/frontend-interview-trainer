const canAccessLesson = (id: number, currentLesson: number) => {
  return id <= currentLesson;
};

export default canAccessLesson;

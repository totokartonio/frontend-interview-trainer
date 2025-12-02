export const isBlock = (children: unknown): boolean => {
  const lineCount = String(children).split("\n").length;
  return lineCount > 1;
};

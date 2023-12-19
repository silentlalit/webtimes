export const trimContent = (content: string, wordCount: number) => {
  return content.length > wordCount
    ? `${content.substring(0, wordCount)}...`
    : content.substring(0, wordCount);
};

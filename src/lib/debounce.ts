export default function debounce(func: () => void, wait: number) {
  let timeout: NodeJS.Timeout | null;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      func(...args);
    }, wait);
  };
}

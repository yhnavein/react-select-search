export default function classes(classNames: string[]) {
  return Object.entries(classNames)
    .filter(([cls, display]) => cls && display)
    .map(([cls]) => cls)
    .join(" ");
}

export default function getValue(option: any) {
  if (!option) {
    return null;
  }

  if (Array.isArray(option)) {
    return option.map((o) => o && o.value);
  }

  return "value" in option ? option.value : null;
}

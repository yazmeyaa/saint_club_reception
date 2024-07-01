export const normalizeString = (str: string): string => {
  return str
    .replaceAll(/\_/g, "\\_")
    .replaceAll(/\*/g, "\\*")
    .replaceAll(/\[/g, "\\[")
    .replaceAll(/\]/g, "\\]")
    .replaceAll(/\(/g, "\\(")
    .replaceAll(/\)/g, "\\)")
    .replaceAll(/\~/g, "\\~")
    .replaceAll(/\`/g, "\\`")
    .replaceAll(/\>/g, "\\>")
    .replaceAll(/\#/g, "\\#")
    .replaceAll(/\+/g, "\\+")
    .replaceAll(/\-/g, "\\-")
    .replaceAll(/\=/g, "\\=")
    .replaceAll(/\|/g, "\\|")
    .replaceAll(/\{/g, "\\{")
    .replaceAll(/\}/g, "\\}")
    .replaceAll(/\./g, "\\.")
    .replaceAll(/\!/g, "\\!");
};

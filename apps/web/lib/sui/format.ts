export function extractGenericType(input: string, depth: number) {
  // Helper function to find the position of the nth '<' or '>'
  function findPosition(str: string, char: string, nth: number) {
    let pos = -1;
    for (let i = 0; i < nth; i++) {
      pos = str.indexOf(char, pos + 1);
      if (pos === -1) break;
    }
    return pos;
  }

  // Check if the depth is valid
  if (depth < 1) {
    return "";
  }

  let startPos = findPosition(input, "<", depth);
  if (startPos === -1) {
    return "";
  }

  let endPos = findPosition(input, ">", depth);
  if (endPos === -1) {
    return "";
  }

  return input.substring(startPos + 1, endPos);
}

export const datetimeFormatter = (datetime: string) => {
  return new Date(datetime).toLocaleString("zh", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
};

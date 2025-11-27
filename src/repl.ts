export function cleanInput(input: string): string[] {
  const result = input.toLowerCase().trim().split(" ").filter((word) => word.length > 0);
  return result;
}
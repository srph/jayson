/**
 * @source https://stackoverflow.com/a/15458987/2698227
 */
export function isHtml(input: string): boolean {
  return /<[a-z][\s\S]*>/i.test(input)
}

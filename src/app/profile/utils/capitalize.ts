export function capitalize(str: string): string {
   if (!str) return undefined;
   const _str = str.toLowerCase();
   return _str.charAt(0).toUpperCase() + _str.slice(1);
}

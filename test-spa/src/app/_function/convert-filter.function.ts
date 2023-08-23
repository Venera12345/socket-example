export function convertFilter(value: string): string[] {
  return value?.length ? value?.replace(' ','').split(',').map((item: string)=>item): []
  }
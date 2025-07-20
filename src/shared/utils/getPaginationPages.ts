export function getPaginationPages(
  current: number,
  total: number,
): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];
  const visiblePages = new Set<number>();
  for (let i = 1; i <= 3; i++) {
    if (i <= total) {
      visiblePages.add(i);
    }
  }
  for (let i = current - 1; i <= current + 1; i++) {
    if (i >= 1 && i <= total) {
      visiblePages.add(i);
    }
  }
  for (let i = total - 2; i <= total; i++) {
    if (i >= 1) {
      visiblePages.add(i);
    }
  }
  const sortedPages = Array.from(visiblePages).sort((a, b) => a - b);
  let lastPage = 0;
  for (const page of sortedPages) {
    if (lastPage && page - lastPage > 1) {
      pages.push('ellipsis');
    }
    pages.push(page);
    lastPage = page;
  }
  return pages;
}

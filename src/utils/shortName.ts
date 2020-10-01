function shortName(title: string): string {
  return title
    .split(' ')
    .map((word) => word[0])
    .join('');
}

export default shortName;

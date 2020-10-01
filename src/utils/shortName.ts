function shortName(title: string): string {
  const withNoSpace = title.split(' ').length === 1 ? true : false;

  if (withNoSpace) return title;

  return title
    .split(' ')
    .map((word) => word[0])
    .join('');
}

export default shortName;

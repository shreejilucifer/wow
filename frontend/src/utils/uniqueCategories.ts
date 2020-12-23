import { RegularCompanyFragment } from '../generated/graphql';

export const uniqueCategories = (
  companies: RegularCompanyFragment[]
): string[] => {
  if (!companies) return [];
  return [...Array.from(new Set(companies.map((item) => item.category)))];
};

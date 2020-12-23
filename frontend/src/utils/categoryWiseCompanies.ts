import { RegularCompanyFragment } from '../generated/graphql';

export const categoryWiseCompanies = (
  companies: RegularCompanyFragment[],
  category: string
): RegularCompanyFragment[] => {
  if (!companies) return [];
  return companies.filter((c) => c.category === category);
};

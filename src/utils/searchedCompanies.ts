import { RegularCompanyFragment } from '../generated/graphql';
import shortName from './shortName';

export const searchedCompanies = (
  companies: RegularCompanyFragment[],
  search: string
): RegularCompanyFragment[] => {
  return companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search) ||
      shortName(c.name).toLowerCase().includes(search)
  );
};

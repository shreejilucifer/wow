import React, { useContext, useState } from 'react';
import {
  CompaniesQuery,
  RegularCompanyFragment,
  useCompaniesQuery,
} from '../../generated/graphql';
import dark from '../../styles/dark/companylist.module.css';
import light from '../../styles/light/companylist.module.css';
import nc from '../../utils/commanumber';
import shortName from '../../utils/shortName';
import { ThemeContext } from '../../utils/theme';

interface companyComponentProps {
  stat: string;
  onSelect: () => any;
  name: string;
  rate: number;
  amount: number;
}

interface categoryComponentProps {
  open: boolean;
  categoryName: string;
  onSelectCategory: (category: string) => any;
  onSelectCompany: (company: string) => any;
  filteredCompanies: RegularCompanyFragment[];
}

interface companyComponentList {}

interface searchbarProps {
  onSearch: (str: string) => any;
}

interface mobileCompanyComponentList {
  uniqueCategories: string[];
}

const Company: React.FC<companyComponentProps> = ({
  stat,
  onSelect,
  amount,
  rate,
  name,
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  const renderClassName = (stat: string) => {
    let myClassName = styles.companyItems;
    if (stat === 'up') myClassName += ' ' + styles.up;
    else myClassName += ' ' + styles.down;
    return myClassName;
  };

  const renderArrow = (stat: string) => {
    if (stat === 'up') return <img src='/icons/green_arrow.svg' />;
    else return <img src='/icons/red_arrow.svg' />;
  };

  return (
    <div className={styles.companyContainer} onClick={() => onSelect()}>
      <div className={styles.companyItems}>{shortName(name)}</div>
      <div className={renderClassName(stat)}>{rate}%</div>
      <div className={styles.companyItems}>{renderArrow(stat)}</div>
      <div className={renderClassName(stat)}>₹{nc(amount)}</div>
    </div>
  );
};

const Category: React.FC<categoryComponentProps> = ({
  open,
  categoryName,
  onSelectCategory,
  onSelectCompany,
  filteredCompanies,
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  return (
    <React.Fragment>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryName}>{categoryName}</div>
        <div
          className={styles.caret}
          onClick={() => onSelectCategory(categoryName)}
        >
          {open ? (
            <img
              src={
                theme
                  ? '/icons/black_arrow_up.svg'
                  : '/icons/arrow_up_white.svg'
              }
            />
          ) : (
            <img
              src={
                theme ? '/icons/arrow_down.svg' : '/icons/arrow_down_white.svg'
              }
            />
          )}
        </div>
      </div>
      {open ? (
        <React.Fragment>
          {filteredCompanies.map((company, index) => {
            let len = company.previousValues.length;
            let stat: string;
            if (len === 1) stat = 'up';
            else
              stat =
                company.previousValues[len].shareValue >
                company.previousValues[len - 1].shareValue
                  ? 'up'
                  : 'down';
            return (
              <Company
                key={index}
                stat={stat}
                onSelect={() => onSelectCompany(company.name)}
                amount={company.shareValue}
                rate={1.5}
                name={company.name}
              />
            );
          })}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const CompanyList: React.FC<companyComponentList> = ({}) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  const { data, loading } = useCompaniesQuery();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const uniqueCategories = (data: CompaniesQuery): string[] => {
    if (!data || !data.companies) return [];

    let uniqueCategoriesArr = [
      ...Array.from(new Set(data.companies.map((item) => item.category))),
    ];

    return uniqueCategoriesArr;
  };

  const filterCompanies = (
    companies: RegularCompanyFragment[],
    category: string
  ): RegularCompanyFragment[] => {
    if (!companies) return [];
    let c = companies.filter((c) => c.category === category);
    if (search !== '') {
      c = c.filter((x) => shortName(x.name).toLowerCase().includes(search));
    }
    return c;
  };

  if (loading) return null;
  else {
    const uniqueCategoriesStr = uniqueCategories(data!);
    return (
      <React.Fragment>
        <MobileCompanyList uniqueCategories={uniqueCategoriesStr} />
        <div className={styles.container}>
          <SearchBar onSearch={(str) => setSearch(str.toLowerCase())} />
          <div className={styles.listContainer}>
            {uniqueCategoriesStr.map((category, index) => (
              <Category
                onSelectCompany={(company) =>
                  console.log(`${company} Selected`)
                }
                onSelectCategory={() => setSelectedCategory(category)}
                open={selectedCategory === category || search !== ''}
                key={index}
                categoryName={category}
                filteredCompanies={filterCompanies(
                  data?.companies as RegularCompanyFragment[],
                  category
                )}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
};

const SearchBar: React.FC<searchbarProps> = ({ onSearch }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchIcon}>
        <img src={theme ? '/icons/search.svg' : '/icons/search_white.svg'} />
      </div>
      <input
        onChange={(e) => onSearch(e.target.value)}
        placeholder='Search for a Category/Company'
        className={styles.searchbar}
        type='text'
      />
    </div>
  );
};

//@ts-ignore
const MobileCompanyList: React.FC<mobileCompanyComponentList> = ({
  uniqueCategories,
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  const [selected, setSelected] = useState(false);

  return (
    <div className={styles.mobileContainer}>
      <div
        onClick={() => setSelected(!selected)}
        className={styles.mobileTitle}
      >
        Select Company
      </div>
      {!selected ? (
        <div className={styles.mobileWrapper}>
          <SearchBar onSearch={() => console.log('Mobile Search')} />

          <div className={styles.listContainer}></div>
        </div>
      ) : null}
    </div>
  );
};

/*
 {uniqueCategories.map((category, index) => (
              <Category
                open={false}
                filteredCompanies={[]}
                key={index}
                categoryName={category}
                onSelect={() => setSelected(!selected)}
              />
            ))}
*/
export default CompanyList;

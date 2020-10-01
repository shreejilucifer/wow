import React, { useContext, useState } from 'react';
import {
  PreviousValue,
  RegularCompanyFragment,
  useCompaniesQuery,
} from '../../generated/graphql';
import dark from '../../styles/dark/companylist.module.css';
import light from '../../styles/light/companylist.module.css';
import shortName from '../../utils/shortName';
import { ThemeContext } from '../../utils/theme';
import SearchBar from './companysearchbar';

interface companyProps {
  onSelect: (id: number) => void;
  data: RegularCompanyFragment;
}

const Company: React.FC<companyProps> = ({ onSelect, data }) => {
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

  const calculateStat = (previousValues: PreviousValue[]): string => {
    let len = previousValues.length;
    let stat: string;
    if (len === 1) stat = 'up';
    else
      stat =
        previousValues[len].shareValue > previousValues[len - 1].shareValue
          ? 'up'
          : 'down';

    return stat;
  };

  return (
    <div className={styles.companyContainer} onClick={() => onSelect(data.id)}>
      <div className={styles.companyItems}>{shortName(data.name)}</div>
      <div
        className={renderClassName(
          calculateStat(data.previousValues as PreviousValue[])
        )}
      >
        1.5%
      </div>
      <div className={styles.companyItems}>
        {renderArrow(calculateStat(data.previousValues as PreviousValue[]))}
      </div>
      <div
        className={renderClassName(
          calculateStat(data.previousValues as PreviousValue[])
        )}
      >
        ₹1,240
      </div>
    </div>
  );
};

interface categoryProps {
  categoryName: string;
  onSelectCompany: (id: number) => void;
  companies: RegularCompanyFragment[];
}

const Category: React.FC<categoryProps> = ({
  categoryName,
  onSelectCompany,
  companies,
}) => {
  const [open, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  return (
    <React.Fragment>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryName}>{categoryName}</div>
        <div className={styles.caret} onClick={() => setOpen(!open)}>
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
          {companies.map((c, i) => (
            <Company data={c} key={i} onSelect={(id) => onSelectCompany(id)} />
          ))}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const CompanyList = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  const [search, setSearch] = useState('');

  const { data } = useCompaniesQuery();

  const uniqueCategories = (companies: RegularCompanyFragment[]): string[] => {
    if (!companies) return [];
    return [...Array.from(new Set(companies.map((item) => item.category)))];
  };

  const categoryWiseCompanies = (
    companies: RegularCompanyFragment[],
    category: string
  ): RegularCompanyFragment[] => {
    if (!companies) return [];
    return companies.filter((c) => c.category === category);
  };

  const searchedCompanies = (
    companies: RegularCompanyFragment[],
    search: string
  ): RegularCompanyFragment[] => {
    if (!companies) return [];
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        shortName(c.name).toLowerCase().includes(search)
    );
  };

  return (
    <React.Fragment>
      <MobileCompanyList />
      <div className={styles.container}>
        <SearchBar onSearchCompanies={(str) => setSearch(str)} />
        <div className={styles.listContainer}>
          {search === ''
            ? uniqueCategories(
                data?.companies as RegularCompanyFragment[]
              ).map((category, i) => (
                <Category
                  onSelectCompany={(id) =>
                    console.log(`Selected Company: ${id}`)
                  }
                  categoryName={category}
                  key={i}
                  companies={categoryWiseCompanies(data?.companies!, category)}
                />
              ))
            : searchedCompanies(data?.companies!, search).map((company, i) => (
                <Company
                  key={i}
                  data={company}
                  onSelect={(id) => console.log(`Selected Company: ${id}`)}
                />
              ))}
        </div>
      </div>
    </React.Fragment>
  );
};

const MobileCompanyList = () => {
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
          <SearchBar
            onSearchCompanies={(str) => console.log(`Mobile Search: ${str}`)}
          />

          <div className={styles.listContainer}>
            {/* Same as Company List*/}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CompanyList;

import React, { useContext, useState } from 'react';
import {
  PreviousValue,
  RegularCompanyFragment,
  useCompaniesQuery,
} from '../../generated/graphql';
import dark from '../../styles/dark/companylist.module.css';
import light from '../../styles/light/companylist.module.css';
import { categoryWiseCompanies } from '../../utils/categoryWiseCompanies';
import nc from '../../utils/commanumber';
import { searchedCompanies } from '../../utils/searchedCompanies';
import shortName from '../../utils/shortName';
import { ThemeContext } from '../../utils/theme';
import { uniqueCategories } from '../../utils/uniqueCategories';
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

  const calculateRate = (
    previousValues: PreviousValue[],
    currentValue: number
  ): number => {
    let len = previousValues.length;

    let previousValue =
      len === 1 ? previousValues[0].shareValue : previousValues[len].shareValue;
    let numerator = currentValue - previousValue;
    let rate = (numerator / previousValue) * 100;

    return rate;
  };

  return (
    <div className={styles.companyContainer} onClick={() => onSelect(data.id)}>
      <div className={styles.companyItems}>{shortName(data.name)}</div>
      <div
        className={renderClassName(
          calculateStat(data.previousValues as PreviousValue[])
        )}
      >
        {calculateRate(data.previousValues as PreviousValue[], data.shareValue)}
        %
      </div>
      <div className={styles.companyItems}>
        {renderArrow(calculateStat(data.previousValues as PreviousValue[]))}
      </div>
      <div
        className={renderClassName(
          calculateStat(data.previousValues as PreviousValue[])
        )}
      >
        ₹{nc(data.shareValue)}
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

  return (
    <React.Fragment>
      <MobileCompanyList />
      <div className={styles.container}>
        <SearchBar onSearchCompanies={(str) => setSearch(str)} />
        <div className={styles.listContainer}>
          {search === ''
            ? uniqueCategories(data?.companies!).map((category, i) => (
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

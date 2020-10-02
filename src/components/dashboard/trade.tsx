import styles from '../../styles/light/trade.module.css';
import CompanyList from './companylist';
import Company from './company';
import { useState } from 'react';
import { Company as CObj, useCompaniesQuery } from '../../generated/graphql';

const Trade = () => {
  const [selectedCompany, setSelectedCompany] = useState<CObj>();

  const { data } = useCompaniesQuery();

  const onSelectCompany = (id: number) => {
    let company = data?.companies.find((c) => c.id === id);
    setSelectedCompany(company as CObj);
  };

  return (
    <div className={styles.container}>
      <CompanyList data={data} onSelectCompany={(id) => onSelectCompany(id)} />
      <div className={styles.main}>
        <Company company={selectedCompany} />
      </div>
    </div>
  );
};

export default Trade;

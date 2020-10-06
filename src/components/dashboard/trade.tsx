import { useState } from 'react';
import { Company as CObj, useCompaniesQuery } from '../../generated/graphql';
import styles from '../../styles/light/trade.module.css';
import Company from './company';
import CompanyList from './companylist';

const Trade = () => {
  const { data } = useCompaniesQuery();
  const [selectedCompany, setSelectedCompany] = useState<CObj>();

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

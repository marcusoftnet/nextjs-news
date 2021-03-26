import React from 'react';
import styles from '../styles/EOM.module.css';
import { Toolbar } from '../components/toolbar';

const EOM = ({ employee }) => {
  return (
    <div className='page-container'>
      <Toolbar />

      <div className={styles.main}>
        <h1>Employee of the month - SSR</h1>

        <div className={styles.employeeOfTheMonth}>
          <h3>{employee.name}</h3>
          <h6>{employee.position}</h6>
          <img src={employee.image} alt='' />
          <p>{employee.description}</p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const URL =
    'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth';
  const apiResponse = await fetch(URL);
  const employee = await apiResponse.json();

  return {
    props: {
      employee,
    },
  };
};

export default EOM;

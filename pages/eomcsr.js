import React, { useEffect, useState } from 'react';
import styles from '../styles/EOM.module.css';
import { Toolbar } from '../components/toolbar';

/* This page is rendered on the front end
  You can see the difference by viewing the source
*/
const EOMCSR = () => {
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const URL =
        'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth';
      const apiResponse = await fetch(URL);
      const employee = await apiResponse.json();
      setEmployee(employee);
    };
    fetchData();
  }, []);

  return (
    <div className='page-container'>
      <Toolbar />
      <div className={styles.main}>
        <h1>Employee of the month - CSR</h1>

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

export default EOMCSR;

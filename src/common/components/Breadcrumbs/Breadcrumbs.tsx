import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs } from '@material-ui/core';
import './breadcrumbs.css';
import { NavLink } from '../NavLink/NavLink';
import { BreadcrumbsProps } from './Breadcrumbs.props';

const BreadcrumbsContainer = (props: BreadcrumbsProps) => {
  let path = useLocation().pathname;

  let splitedPath = path.split('/');
  splitedPath = splitedPath.map((item) => {
    return item.replace(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gm,
      'Edit'
    );
  });

  const capitalizeFirstLetter = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const breadcrumbsStyle = {
    paddingBottom: 10,
    letterSpacing: 2,
  };

  return (
    <Breadcrumbs
      className={'Breadcrumbs'}
      style={breadcrumbsStyle}
      separator={'>'}
    >
      {splitedPath.map((item, index) => (
        <NavLink
          to={`/${item}`}
          text={
            item === '' && index === 0 ? 'Home' : capitalizeFirstLetter(item)
          }
          key={item}
          className={index === splitedPath.length - 1 ? 'Inactive' : 'Active'}
          disabled={index === splitedPath.length - 1}
        />
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbsContainer;

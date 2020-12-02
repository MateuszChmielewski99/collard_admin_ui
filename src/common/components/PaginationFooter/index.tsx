import { MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { Stack } from '../Stack';
import { PaginationFooterProps } from './PaginationFooter.props';
import './PaginationFooter.styles.css';

const PaginationFooter = (props: PaginationFooterProps) => {
  const getPageButton = (isActive: boolean, buttonNumber: number) => {
    const className = `btn ${
      isActive ? 'btn-primary' : 'btn btn-secondary'
    } page_button`;
    return (
      <button
        className={className}
        onClick={() => props.onPageChange(buttonNumber)}
      >
        {buttonNumber}
      </button>
    );
  };

  const numberOfPages = Math.ceil(props.totalCount / props.pageSize);

  const getPageButtons = React.useMemo(() => {
    const buttons = [];
    for (let i = 0; i < numberOfPages; i++) {
      const isActive = props.currentPage === i + 1;
      const button = getPageButton(isActive, i + 1);
      buttons.push(button);
    }

    return buttons;
  }, [props.currentPage, props.pageSize]);

  const from = (props.currentPage - 1) * props.pageSize + 1;
  const to =
    props.currentPage === numberOfPages
      ? props.totalCount
      : from + props.pageSize - 1;

  return (
    <Stack horizontal className={'footer_container'} alignItems={'baseline'}>
      <Stack className={'info'}>
        Showing {from} to {to} of {props.totalCount}
      </Stack>
      <Select
        value={props.pageSize}
        onChange={(i) =>
          props.onPageSizeChange(Number.parseInt(i.target.value as string))
        }
      >
        {props.pageSizeOptions?.map((o) => (
          <MenuItem value={o} key={o}>
            {o}
          </MenuItem>
        ))}
      </Select>
      <Stack flex={1}></Stack>
      <Stack horizontal>{getPageButtons}</Stack>
    </Stack>
  );
};

PaginationFooter.defaultProps = {
  pageSizeOptions: [2, 5, 10],
};

export default PaginationFooter;

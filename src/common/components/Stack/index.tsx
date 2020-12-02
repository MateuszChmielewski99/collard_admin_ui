import React, { CSSProperties, ReactNode } from 'react';

type StackProps = {
  horizontal?: boolean;
  children?: ReactNode | ReactNode[];
  alignItems?: string;
  justifyContent?: string;
  className?: string;
  flex?: string | number;
  alignSelf?: string;
  role?: string;
  style?: React.CSSProperties;
  flexWrap?:
    | '-moz-initial'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'nowrap'
    | 'wrap'
    | 'wrap-reverse'
    | undefined;
};

export const Stack = (props: StackProps) => {
  const styles: CSSProperties = {
    boxSizing:'border-box',
    ...props.style,
    display: 'flex',
    flexDirection: !props.horizontal ? 'column' : 'row',
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    flex: props.flex,
    alignSelf: props.alignSelf,
    flexWrap: props.flexWrap || 'nowrap',
  };

  return (
    <div style={styles} className={props.className} role={props.role}>
      {props.children}
    </div>
  );
};

Stack.defaultProperties = {
  alignItems: 'center',
  justifyContent: 'center',
  className: '',
};

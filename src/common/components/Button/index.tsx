import React from 'react';
import './button.css';

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  variant?: ButtonTypes;
};

export enum ButtonTypes {
  Primary,
  Default,
  Warning,
}

export const Button = (props: ButtonProps) => {
  const getClassName = (type: ButtonTypes) => {
    switch (type) {
      case ButtonTypes.Primary:
        return 'm_button_primary';
      case ButtonTypes.Warning:
        return 'm_button_warning'
    }
  };
  const { variant, children, type, ...restProps } = props;
  const className = `m_button ${getClassName(props.variant || ButtonTypes.Primary)} ${
    props.disabled ? 'm_button_disabled' : ''
  }`;
  return (
    <button className={className} {...restProps}>
      {props.children}
    </button>
  );
};

Button.defaultProperties = {
  variant: ButtonTypes.Primary,
};

import * as React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
  align-items: baseline;
  display: inline-flex;
  max-width: 100%;
  background-color: green;
  border: none;
  margin: 0;
  white-space: nowrap;
  transition: background-color 0.1s ease-out;
`;

interface IButtonProps {
  onClick?: () => void;
  innerRef?: () => void | React.Ref<any> | string | React.RefObject<any>;
}

interface IButtonState {}

const { Component } = React;

export default class Button extends Component<IButtonProps, IButtonState> {
  public render = () => {
    return (
      <StyledButton onClick={this.props.onClick} innerRef={this.props.innerRef}>
        {this.props.children}
      </StyledButton>
    );
  };
}

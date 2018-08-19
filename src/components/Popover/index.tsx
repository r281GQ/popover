import * as React from 'react';

import Positioner from './Positioner';

interface IProps {
  content: React.ReactElement<any>;
}

interface IState {
  isOpen: boolean;
}

export default class Popover extends React.PureComponent<IProps, IState> {
  readonly state = { isOpen: false };

  public render = () => {
    return (
      <Positioner getRefForChildren={this.createInvoker}>
        {({ contentRef, style }) =>
          this.state.isOpen ? (
            <div
              ref={contentRef}
              style={{
                position: 'absolute',
                borderWidth: 5,
                borderStyle: 'dotted',
                borderColor: 'black',
                ...style
              }}
            >
              {this.props.content}
            </div>
          ) : null
        }
      </Positioner>
    );
  };

  private createInvoker = (invokerRef: React.Ref<any>) => {
    let refProp: {
      innerRef?: React.Ref<any>;
      ref?: React.Ref<any>;
      onClick: () => void;
    } = {
      onClick: () => {
        this.setState(state => {
          return {
            isOpen: !state.isOpen
          };
        });
      }
    };

    const baseElement = this.props.children;

    if (typeof baseElement === 'string') {
      refProp.ref = invokerRef;
    } else {
      refProp.innerRef = invokerRef;
    }

    return React.cloneElement(baseElement as React.ReactElement<any>, {
      ...refProp
    });
  };
}

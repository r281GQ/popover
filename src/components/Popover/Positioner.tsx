import * as React from 'react';
import * as ReactDOM from 'react-dom';

import getPosition from './getPosition';
import Position from './Position';

interface IState {
  style: {
    top: number;
    left: number;
  };
}

interface IProps {
  content?: any;
  renderContents?: any;
  setTargetRef?: any;
  getRefForChildren?: any;
  children: (renderProps: IRenderProps) => any;
}

interface IRenderProps {
  contentRef: React.Ref<HTMLDivElement>;
  style: { top: number; left: number };
}

type NullableClientRect = ClientRect | null;

export default class Popover extends React.Component<IProps, IState> {
  public contentRef = React.createRef<HTMLDivElement>();
  public invokerRef = React.createRef<HTMLButtonElement>();

  readonly state = {
    style: { top: 0, left: 0 }
  };

  public shouldComponentUpdate = (
    nextProps: IProps,
    nextState: IState
  ): boolean => {
    const isTheSameStyle =
      this.state.style.left === nextState.style.left &&
      this.state.style.top === nextState.style.top;

    return this.props.children !== nextProps.children || !isTheSameStyle;
  };

  public render = () => {
    const { contentRef } = this;
    const { style } = this.state;

    const renderProps: IRenderProps = { contentRef, style };

    return (
      <React.Fragment>
        {this.renderInvoker()}
        {ReactDOM.createPortal(
          this.props.children(renderProps),
          document.getElementById('body') as HTMLElement
        )}
        <button onClick={this.handleClick}>Start animation!</button>
      </React.Fragment>
    );
  };

  private handleClick = (event: React.MouseEvent): void => this.update();

  private update = (): void => {
    const targetRect = this.getInvokerRect();

    const viewportHeight: number =
      document.documentElement.clientHeight + window.scrollY;
    const viewportWidth: number =
      document.documentElement.clientWidth + window.scrollX;

    const {
      rect: { top, left }
    } = getPosition({
      targetOffset: 8,
      targetRect,
      viewport: {
        width: viewportWidth,
        height: viewportHeight
      },
      position: Position.BOTTOM,
      dimensions: {
        height: this.contentRef.current.offsetHeight,
        width: this.contentRef.current.offsetWidth
      }
    });

    this.setState({ style: { left, top } });

    window.requestAnimationFrame(() => {
      this.update();
    });
  };

  private renderInvoker = (): React.ReactElement<React.ReactNode> => {
    return this.props.getRefForChildren(this.invokerRef);
  };

  private getInvokerRect = (): NullableClientRect =>
    this.invokerRef.current
      ? this.invokerRef.current.getBoundingClientRect()
      : null;
}

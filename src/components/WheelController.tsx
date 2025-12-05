import './WheelController.css';
import { type HTMLAttributes } from 'react';

interface WheelControllerProps extends HTMLAttributes<HTMLDivElement> {}

const WheelController = ({ ...props }: WheelControllerProps) => {
  return <div id="wheel-controller" {...props}></div>;
};

export default WheelController;

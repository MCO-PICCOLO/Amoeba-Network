import './FanController.css';
import { type HTMLAttributes } from 'react';

interface FanControllerProps extends HTMLAttributes<HTMLDivElement> {}

const FanController = ({ ...props }: FanControllerProps) => {
  return (
    <div id="fan-controller" {...props}>
      <div className="inner-area"></div>
    </div>
  );
};

export default FanController;

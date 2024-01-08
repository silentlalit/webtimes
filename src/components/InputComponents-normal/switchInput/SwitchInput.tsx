import React from 'react';
import styles from './switchInput.module.scss';

const { switchWrapper, slider } = styles;

const SwitchInput = ({ ...props }: any) => {
    return (
        <div>
            <label className={switchWrapper}>
                <input type="checkbox" {...props} />
                <span className={slider}></span>
            </label>
        </div>
    );
};

export default SwitchInput;

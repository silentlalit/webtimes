import React from 'react';
import { Controller } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const styles = {
    defaultWrapperStyle: {
        width: '100%',
        margin: 10,
        marginLeft: 0,
    },
    defaultStyle: {
        padding: '8px 15px',
        borderRadius: 4,
        fontSize: 16,
        fontWeight: '500',
        width: '100%',
        outline: 'none',
        transition: 'all 100ms',
        backgroundColor: 'hsl(0, 0%, 100%)',
        border: '1px solid hsl(0, 0%, 80%)',
    },
};

const { defaultWrapperStyle, defaultStyle } = styles;

function PhoneNumberInput({
    control,
    name,
    error,
    wrapperStyle = {},
    style = {},
    label,
    ...props
}: any) {
    const { message } = error || {};

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <div style={{ ...defaultWrapperStyle, ...wrapperStyle }}>
                    {label && <label>{label}</label>}
                    <PhoneInput
                        placeholder="Enter phone number"
                        defaultCountry="IN"
                        value={value ? value : ''}
                        onChange={(e: any) => {
                            onChange(e);
                        }}
                        style={{ ...defaultStyle, ...style }}
                        {...props}
                    />
                    {message && <p className="errorStyle">{message}</p>}
                </div>
            )}
        />
    );
}

export default PhoneNumberInput;

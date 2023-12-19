import React from 'react'
import { Controller } from 'react-hook-form'

const styles = {
    defaultWrapperStyle: {
        width: "100%",
        margin: 10,
        marginLeft: 0
    },
    defaultlabel: {
        display: 'block',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5
    },
    defaultStyle: {
        padding: '8px 15px',
        borderRadius: 4,
        fontSize: 16,
        fontWeight: '500',
        width: '100%',
        outline: 0,
        transition: 'all 100ms',
        backgroundColor: 'hsl(0, 0%, 100%)',
        border: '1px solid hsl(0, 0%, 80%)'
    }
}

const { defaultWrapperStyle, defaultlabel, defaultStyle } = styles;

function DateInput({
    control,
    name,
    error,
    placeholder,
    label,
    wrapperStyle = {},
    style = {},
    ...props
}: any) {
    const { message } = error || {};

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <div style={{ ...defaultWrapperStyle, ...wrapperStyle }}>
                    {label && <label style={defaultlabel}>{label}</label>}
                    <input
                        type="date"
                        value={value ? value.split('T')[0] : ""}
                        onChange={(e: any) => {
                            onChange(e.target.value);
                        }}
                        style={{ ...defaultStyle, ...style }}
                        {...props}
                    />
                    {message && <p className='errorStyle'>{message}</p>}
                </div>
            )}
        />
    )
}

export default DateInput
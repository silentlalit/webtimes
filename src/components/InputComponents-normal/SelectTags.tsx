'use client';
import React, { useEffect, useState } from 'react';
import Tag from '../Tag';
import { Option } from './SelectTags2';

export function SelectTags({
    label,
    placeholder,
    wrapperStyle = {},
    style = {},
    isMulti = false,
    selected = [],
    options = [],
    onChange,
    ...props
}: any) {
    const [selectedTags, setSelectedTags] = useState<Option[]>(selected);

    useEffect(() => {
        onChange(selectedTags);
    }, [selectedTags]);

    const isSelected = (item: Option) =>
        selectedTags.find((option) => option.value === item.value);

    const handleSelect = (option: Option) => {
        if (isMulti) {
            setSelectedTags((prev) => {
                return isSelected(option)
                    ? prev.filter((s) => s !== option)
                    : [...prev, option];
            });
        } else {
            isSelected(option)
                ? setSelectedTags([])
                : setSelectedTags([option]);
        }
    };

    return (
        <div style={{ ...defaultWrapperStyle, ...wrapperStyle }}>
            {label && <label>{label}</label>}

            {options.map((option: Option, idx: number) => (
                <Tag
                    key={idx}
                    text={option.value}
                    style={{
                        ...defaultStyle,
                        backgroundColor: isSelected(option)
                            ? 'var(--primary-color)'
                            : 'var(--white-color)',
                        color: 'var(--black-color)',
                    }}
                    onClick={() => handleSelect(option)}
                    {...props}
                />
            ))}
        </div>
    );
}

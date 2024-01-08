'use client';

import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import './page.scss';

const Settings = () => {
    const { clrTheme, setClrTheme } = useTheme();

    const changeInputHandle = function (
        e: React.ChangeEvent<HTMLInputElement>,
        property: string
    ) {
        setClrTheme((prev: any) => ({
            ...prev,
            [property]: e,
        }));

    };

    const debounce = (
        func: (
            e: React.ChangeEvent<HTMLInputElement>,
            property: string
        ) => void,
        delay: number
    ) => {
        let debounceTimer: NodeJS.Timeout;

        return function (
            this: any,
            e: React.ChangeEvent<HTMLInputElement>,
            property: string
        ) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func(e, property), delay);
        };
    };

    const handleChangeTheme = debounce(changeInputHandle, 500);

    return (
        <div className="userSettingsPage">
            <h2>Settings</h2>

            <div className="themeColorsSettings">
                <h4>Change Theme Colors</h4>

                <div className="wrapper">
                    {Object.keys(clrTheme).map((property, i) => {
                        return (
                            <div className="box" key={i}>
                                <label htmlFor={`${property}`}>
                                    {property}
                                </label>
                                <input
                                    type="color"
                                    value={clrTheme[property]}
                                    name={`${property}`}
                                    id={`${property}`}
                                    onChange={(e: any) =>
                                        handleChangeTheme(
                                            e.target.value,
                                            property
                                        )
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Settings;

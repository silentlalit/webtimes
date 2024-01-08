'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Theme = {
    [key: string]: string;
};

const ThemeContext = createContext<{ clrTheme: Theme; setClrTheme: React.Dispatch<React.SetStateAction<Theme>> }>({
    clrTheme: {},
    setClrTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [clrTheme, setClrTheme] = useState<Theme>({
        '--primary-color': '#ff5e69',
        '--secondary-color': '#b16cea',
        '--ternary-color': '#ff8a56',

        '--exLightGray-color': '#fafafa',
        '--gray50-color': '#cacaca',

        '--blue-color': '#aeb5ff',
        '--brown-color': '#46364a',
        '--red-color': '#c41604',
        '--green-color': '#228b22',

        '--black-color': '#ffffff',
        '--white-color': '#020011',
        '--gray-color': '#05021a',
        '--lightGray-color': '#0c0823',
    });

    // const updateTheme = (newTheme: any) => {
    //     setTheme((prev: any) => ({ ...prev, ...newTheme }));
    //     toast.success('Theme Updated');
    // };

    useEffect(() => {
        console.log("first")
        for (const property in clrTheme) {
            document.documentElement.style.setProperty(
                property,
                clrTheme[property]
            );
        }
    }, [clrTheme]);

    return (
        <ThemeContext.Provider value={{ clrTheme, setClrTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

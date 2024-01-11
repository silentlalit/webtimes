'use client'

import React, { useState, useEffect, Fragment } from 'react'
import { GiSpaceSuit } from 'react-icons/gi'
import { GoHome, GoProject } from 'react-icons/go'
import { BsChatLeft } from 'react-icons/bs'
import { MdOutlineContacts } from 'react-icons/md'
import { RiBarChartHorizontalLine } from 'react-icons/ri'
import { usePathname } from 'next/navigation'

import { LoadingUser, Sidebar } from '@/components'
import styles from '@/styles/userLayout.module.scss'
import { useAppSelector } from '@/redux/hook'
import { RootState } from '@/redux/store/store'
// import AblyProviderContainer from '@/providers/AblyProvider'
import { SocketProvider } from '@/providers/socketIo';

const { userLayout, container, userProfileMenu } = styles;

export const metadata = {
    title: 'Webtimes - User',
    description: 'user profile in webtimes for exploring more features',
}

const menu = [
    {
        name: 'WebTimes',
        Icon: <span>WT</span>,
        link: '/',
    },
    {
        name: 'My Space',
        Icon: <GiSpaceSuit size={35} />,
        link: '/user/profile',
    },
    {
        name: 'Home',
        Icon: <GoHome size={35} />,
        link: '/user',
    },
    {
        name: 'My Orders',
        Icon: <GoProject size={35} />,
        link: '/user/orders',
    },
    {
        name: 'Chats',
        Icon: <BsChatLeft size={35} />,
        link: '/user/chats',
    },
    {
        name: 'Contact Us',
        Icon: <MdOutlineContacts size={35} />,
        link: '/contact-us',
    },
]

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const { isAuthenticated } = useAppSelector(
        (state: RootState) => state.authUser
    )
    const [openMenu, setOpenMenu] = useState(false)

    useEffect(() => {
        setOpenMenu(false)
    }, [pathname])

    const handleOpenMenu = () => setOpenMenu(!openMenu)

    return (
        <div className={userLayout}>
            {!isAuthenticated ? (
                <LoadingUser />
            ) : (
                <Fragment>
                    <div
                        className={`flex ${userProfileMenu}`}
                        onClick={handleOpenMenu}
                    >
                        <RiBarChartHorizontalLine
                            size={22}
                            color="var(--black-color)"
                        />
                    </div>

                    <Sidebar menu={menu} openMenu={openMenu} />

                    <SocketProvider>
                    {/* <AblyProviderContainer> */}
                        <div className={`${container} dContainer`}>
                            {children}
                        </div>
                    {/* </AblyProviderContainer> */}
                    </SocketProvider>
                </Fragment>
            )}
        </div>
    )
}

export default Layout

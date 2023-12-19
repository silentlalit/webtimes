import React from 'react';
import Image from 'next/image';
import styles from './commonSec.module.scss';
import { Button } from '@/components';
import Link from 'next/link';

const { comSec, container, comSec_text, comSec_image } = styles;

type PropType = {
    tag: string,
    title: string,
    content: string,
    image: string,
    buttonTitle: string,
    link: string
}

function CommonSec({ tag, title, content, image, buttonTitle, link }: PropType) {
    return (
        <section className={comSec}>
            <div className={`${container} dContainer`}>
                <div className={comSec_text}>
                    <h4 className='topTag'>{tag}</h4>
                    <h2 dangerouslySetInnerHTML={{ __html: title }} />
                    <p dangerouslySetInnerHTML={{ __html: content }} />

                    <Link href={link} >
                        <Button title={buttonTitle} wrapperStyle={{ marginTop: 30 }} />
                    </Link>
                </div>

                <div className={comSec_image}>
                    <Image src={image} alt={title} sizes='500px' fill />
                </div>
            </div>
        </section>
    )
}

export default CommonSec
import React from 'react';
import Image from 'next/image';
import { FiEdit2 } from 'react-icons/fi';

import styles from './profile.module.scss';
import { Loader } from '@/components';

const { profile, profile_image, uploadInput, loaderBox } = styles;

const Profile = ({ name, img, edit, loading = false }: any) => {
    return (
        <div
            className={profile}
            style={{ pointerEvents: loading ? 'none' : 'all' }}
        >
            <div className={profile_image}>
                <Image src={img} width={100} height={100} alt={name} />
                {edit && (
                    <span className={uploadInput}>
                        <label htmlFor="updateProfile">
                            <input
                                type="file"
                                name="updateProfile"
                                id="updateProfile"
                                onChange={edit}
                            />
                            <FiEdit2 size={15} />
                        </label>
                    </span>
                )}

                {loading && (
                    <div className={loaderBox}>
                        <Loader />
                    </div>
                )}
            </div>

            <h4>{name}</h4>
        </div>
    );
};

export default Profile;

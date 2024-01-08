'use client';

import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import './profileEdit.scss';

import { Button, PhoneNumberInput, ProfileIcon, TextInput } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import UpdateAddress from './UpdateAddress';
import { updateProfilePic, updateUser } from '@/redux/slices/authSlice';

const userSchema = yup.object({
  name: yup.string().required('Name is required.'),
  number: yup
      .string()
      .required('Number is required.'),
  username: yup.string().required('Username is required.'),
  email: yup
      .string()
      .nullable()
      .email('Not a valid email')
      .required('Email is required.'),
});

const Page = () => {
    const dispatch = useAppDispatch();
    const { logggedInUser }: any = useAppSelector(
        (state: RootState) => state.authUser
    );
    const {
        _id,
        name = '',
        username = '',
        email = '',
        avatar = '',
        role = '',
        number = '',
    } = logggedInUser || '';

    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(avatar);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<any>({
        resolver: yupResolver(userSchema),
        mode: 'all',
        reValidateMode: 'onChange',
        defaultValues: {},
    });

    useEffect(() => {
        reset({
            name: name || '',
            username: username || '',
            email: email || '',
            avatar: avatar || '',
            role: role || '',
            number: number || '',
        });
    }, [reset, name, username, email, avatar, role, number]);

    const handleProfileUpdate = async (e: any) => {
        if (!_id) {
            toast.error(`User not loaded.`);
            return;
        }

        const file: File = e.target.files[0];
        if (!file) {
            toast.error(`choose a image.`);
            return;
        }

        setLoading(true);
        const fd = new FormData();
        fd.append('id', _id);
        fd.append('avatar', file);

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setProfile(`${e.target?.result}`);
        };

        try {
            const { payload }: any = await dispatch(updateProfilePic(fd));

            if (payload.success) {
                toast.success(payload.message);
            }
            setLoading(false);
        } catch (error: any) {
            toast.error(`${error.message} Profile Update failed.`);
            setLoading(false);
        }
    };

    const handleProfileData = async (data: any) => {
        setLoading(true);
        console.log(data)
        // return

        try {
            const { payload }: any = await dispatch(
                updateUser({ id: _id, name: data.name, number: data.number })
            );

            if (payload.success) {
                toast.success(payload.message);
            }
            setLoading(false);
        } catch (error: any) {
            toast.error(`${error.message} Profile Update failed.`);
            setLoading(false);
        }
    };

    return (
        <div className="editProfilePage">
            <div className="container">
                <form onSubmit={handleSubmit(handleProfileData)}>
                    <ProfileIcon
                        name={name}
                        img={`/upload/avatar/${profile}`}
                        edit={handleProfileUpdate}
                        loading={loading}
                    />

                    <TextInput
                        placeholder="Your full name"
                        label="Your full name"
                        control={control}
                        name="name"
                        error={errors.name}
                    />

                    <TextInput
                        placeholder="Registered Email"
                        label="Registered Email"
                        control={control}
                        name="email"
                        error={errors.email}
                        readOnly
                    />

                    <TextInput
                        placeholder="Registered username"
                        label="Registered username"
                        control={control}
                        name="username"
                        error={errors.username}
                        readOnly
                    />

                    <TextInput
                        placeholder="User Role"
                        label="User Role"
                        control={control}
                        name="role"
                        error={errors.role}
                        readOnly
                    />

                    <PhoneNumberInput
                      placeholder="Phone Number"
                      label="Phone Number"
                      control={control}
                      name="number"
                      error={errors.number}
                     />

                    <Button
                        type="submit"
                        title="Update Info"
                        wrapperStyle={{
                            marginTop: 40,
                            pointerEvents: loading ? 'none' : 'all',
                        }}
                        loading={loading}
                        disabled={loading}
                    />
                </form>

                <div className="updateAddress">
                    <UpdateAddress user={logggedInUser} dispatch={dispatch} />
                </div>
            </div>
        </div>
    );
};

export default Page;

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/app/api/middleware/mongoose';
import { ErrorRes } from '@/app/api/helper/ErrorRes';
import User from '@/app/api/models/user';
import { uploadImage } from '@/app/api/helper/utils';

export const POST = async (req: NextRequest) => {
    try {
        await connectDb();

        const fd = await req.formData();

        const userId = fd.get('id');
        const user = await User.findById(userId);
        if (!user) return ErrorRes(false, 'User not find', 400);

        const avatar: any = fd.get('avatar');
        if (!avatar) return ErrorRes(false, 'No file received.', 400);

        // uploading thumbnail
        const filename = await uploadImage('public/upload/avatar/', avatar);

        user.avatar = filename;
        user.save();

        return NextResponse.json({
            success: true,
            message: 'Profile Updated!',
            avatar: user.avatar,
        });
    } catch (error: any) {
        return ErrorRes(false, error.message, 500);
    }
};

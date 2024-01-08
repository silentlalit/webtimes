import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/app/api/middleware/mongoose';
import { ErrorRes } from '@/app/api/helper/ErrorRes';
import User from '@/app/api/models/user';

export const PATCH = async (req: NextRequest) => {
    try {
        await connectDb();

        const data = await req.json();
        const user = await User.findById(data.id);
        if (!user) return ErrorRes(false, 'User not find', 400);

        user.name = data.name;
        user.number = data.number;
        user.save();

        return NextResponse.json({
            success: true,
            message: 'Profile Updated!',
            user: user,
        });
    } catch (error: any) {
        console.log(error)
        return ErrorRes(false, error.message, 500);
    }
};

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs"

import { success } from "zod/v4";
import UserModel from "@/model/user";

export async function POST(request: Request) {

    await dbConnect();
    try {
        const { username, email, password } = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });
        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "Username already exists",
                },
                {
                    status: 400,
                }
            );
        }
        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "Email already exists",
                    },
                    {
                        status: 400,
                    }
                );
            } else {
                const hasendPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hasendPassword;
                existingUserByEmail.verifyCode = verifyCode;
                // Set expiry date to 1 hour from now
                existingUserByEmail.verifyCodeExpairy = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else {
            const hasendPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry date to 1 hours from now

            const newUser = new UserModel({
                username,
                email,
                password: hasendPassword,
                verifyCode,
                verifyCodeExpairy: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: [],
            });
            await newUser.save();
        }

        //send verification email
        const emailResponese = await sendVerificationEmail(email, username, verifyCode);
        if (!emailResponese.sucess) {
            return Response.json(
                {
                    success: false,
                    message: emailResponese.message,
                },
                {
                    status: 500,
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: "User created successfully. Please check your email to verify your account.",
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error('Database connection error:', error);
        return Response.json(
            {
                success: false,
                message: "Database connection error",
            },
            {
                status: 500,
            }
        );
    }
}


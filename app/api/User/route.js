import connectDB from "@/utils/mongoose.js";
import User from "@/utils/Models/UserModel.js"
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        console.log(body);

        const { Name, Email, Image } = body;

        if (!Name || !Email || !Image) {
            return NextResponse.json({
                message: "Kindly Fill the all Data "
            }, {
                status: 500
            })
        }

        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ).test(Email)) {
            return NextResponse.json({
                message: "Kindly enter the valid email"
            }, {
                status: 500
            })
        }
        await User.create(body);


        return NextResponse.json({
            message: "Data successfully add"
        }, {
            status: 200
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Server error Please try again!"
        })
    }
}
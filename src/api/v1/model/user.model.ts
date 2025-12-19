import mongoose, { Document, Model, Schema } from "mongoose";

interface IBorrowedBook {
    bookId: mongoose.Types.ObjectId;
    returned: boolean;
    bookTitle: string;
    borrowedDate: Date;
    dueDate: Date;
}

interface IAvatar {
    public_id?: string;
    url?: string;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "USER";
    accountVerified: boolean;
    borrowedBooks: IBorrowedBook[];
    avatar?: IAvatar;
    verificationCode?: number;
    verificationCodeExpire?: Date | undefined;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    generateVerificationCode():number
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique:true
        },

        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER",
        },
        accountVerified: {
            type: Boolean,
            default: false,
        },
        borrowedBooks: [
            {
                bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Borrow" },
                returned: {
                    type: Boolean,
                    default: false,
                },
                bookTitle: String,
                borrowedDate: Date,
                dueDate: Date,
            },
        ],
        avatar: {
            public_id: String,
            url: String,
        },
        verificationCode: Number,
        verificationCodeExpire: Date,
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true },
);

userSchema.methods.generateVerificationCode=function(){
    function generateOtp(){
        let otp="";
        for(let i=0;i<6;i++){
            otp+=Math.floor(Math.random() *10)
        }
        return Number(otp)
    }

    const verificationCode=generateOtp()
    this.verificationCode=verificationCode
    this.verificationCodeExpire=new Date(Date.now() + 15 * 60 * 1000);
    return verificationCode
}
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;

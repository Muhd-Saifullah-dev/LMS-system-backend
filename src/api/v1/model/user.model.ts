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
    verificationCodeExpire?: Date;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
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

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;

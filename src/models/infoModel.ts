import mongoose, { Schema, Document } from 'mongoose';

enum UserRole {
    Admin = 'admin',
    User = 'user',
}

export interface Info extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    location: {
        type: string;
        coordinates: number[];
    };
}

const InfoSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [UserRole.Admin, UserRole.User],
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
}, {
    timestamps: true,
});

InfoSchema.index({ location: '2dsphere' });

const Info = mongoose.model<Info>('Info', InfoSchema);

export default Info;
import mangoose , {Schema, Document,} from 'mongoose';


export interface Message extends Document {
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpairy: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    message: Message[]

}
const UserSchema: Schema<User> = new Schema({
   username: {
        type: String,
        required:[ true, "Username is required"],
        trim: true,
        unique: true
    
    },
    email: {
        type: String,
        required:[ true, "Email is required"],
        unique: true,
        match: [/.+@.+\..+/, "Email is invalid"],
        lowercase: true,
        trim: true
        
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],
        trim: true
    },
    verifyCodeExpairy: {
        type: Date,
        required: [true, "Verify code expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    message: [MessageSchema]

   

});

const UserModel = (mangoose.models.User as mangoose.Model<User>) || mangoose.model("User", UserSchema)
export default UserModel;

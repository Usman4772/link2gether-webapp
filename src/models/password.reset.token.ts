import mongoose from "mongoose"

const passwordResetToken = new mongoose.Schema({
    resetToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expireAfterSeconds: 3600 } // Expire after 1 hour (3600 seconds)
    }
}, { timestamps: true })



const resetToken = mongoose.models.passwordResetToken || mongoose.model('passwordResetToken', passwordResetToken);
export default resetToken;
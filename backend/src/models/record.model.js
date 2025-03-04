import mongoose, { model, Mongoose, Schema } from "mongoose";


const recordSchema = new Schema({
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    historyOfSurgery: { type: String, default: "no surgery" },
    prescribed: { type: Boolean, default: false },
    presentInHistory: { type: Boolean, default: false },
    allergies: { type: String, default: "no allergies" },
    diabeticOrNot: { type: String, default: "no diabetic" },
    recentSurgery: { type: String, default: "no surgery" },
    currentIllness: { type: String, required: true },
    others: { type: String },
    transactionId: { type: String, required: true },
    pdf: { type: String }
}, { timestamps: true })

export const Record = mongoose.model('Record', recordSchema);


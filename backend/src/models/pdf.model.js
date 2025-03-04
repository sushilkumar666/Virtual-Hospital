import mongoose, { Schema } from "mongoose";

const pdfSchema = new Schema({
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    recordId: { type: Schema.Types.ObjectId, ref: 'Record', required: true },
    pdf: { type: String, required: true },
}, { timestamps: true })


export const Pdf = mongoose.model('Pdf', pdfSchema);
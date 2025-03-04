import { Patient } from "../models/patient.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Pdf } from "../models/pdf.model.js";
import { Record } from "../models/record.model.js";
import { verifyDoctorJWT } from "../middlewares/doctor.middleware.js";


const createRecord = async (req, res) => {

    const { doctorId } = req.params;
    const patientId = req.patient._id;
    try {
        const { historyOfSurgery, historyOfIllness, allergies, currentIllness, diabeticOrNot, others, recentSurgery, transactionId } = req.body;

        const newRecord = await Record.create({
            doctorId,
            patientId,
            historyOfSurgery, historyOfIllness, allergies, currentIllness, diabeticOrNot, recentSurgery, others, transactionId
        })

        if (!newRecord) {
            throw new Error("Error while creating record");
        }

        res.status(200).json({
            success: true,
            data: newRecord,
            message: "Record created Successfully"
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message + " error while creating record"
        })
    }
}

const prescribed = async (req, res) => {

    const recordId = req.params.recordId;

    try {
        const updatedRecord = await Record.findByIdAndUpdate(
            recordId,
            { $set: { prescribed: true, presentInHistory: true } },
            { new: true }
        );

        if (!updatedRecord) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json({ success: true, updatedRecord });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const patientHistory = async (req, res) => {
    try {
        const doctorId = req.doctor._id;
        const patientHistory = await Record.find({ doctorId, prescribed: true, presentInHistory: true }).populate("patientId", "name age email phone profileImage pdf")

        res.json({
            success: true,
            message: 'patient history',
            patientHistory
        })

    } catch (error) {
        res.json({
            success: false,
            message: 'error while fetching patient history',
            error: error.message
        })
    }

}


const getPatientList = async (req, res) => {
    const doctorId = req.doctor._id
    try {
        const patientList = await Record.find({ doctorId, prescribed: false }).populate("patientId", "name age email phone profileImage")
        const count = patientList.length;

        res.status(200).json({
            success: true,
            patientList,
            count,
            message: "patient fetched successfully"
        })

    } catch (error) {
        throw new Error("error while fetching doctorList" + error);
    }

}


const removeRecord = async (req, res) => {
    try {
        const { recordId } = req.params;

        const removeRecord = await Record.findByIdAndUpdate(recordId, { $set: { presentInHistory: false } }, { new: true })
    } catch (error) {
        res.json({
            success: false,
            message: "Error while deleting record",
            error: message.error
        })
    }
}

export {
    createRecord, prescribed, patientHistory, getPatientList, removeRecord
}

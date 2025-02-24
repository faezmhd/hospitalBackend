const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Get all appointments
router.get("/get", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new appointment
router.post("/add", async (req, res) => {
    console.log(req.body);
    const appointment = new Appointment({
        patient: req.body.patient,
        doctor: req.body.doctor,
        appointmentDate: req.body.appointmentDate,
    });
    try {
        const newAppointment = await appointment.save();
        console.log(newAppointment);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an appointment by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "Appointment deleted" });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({ message: error.message });
    }
});

// Update a appointment by ID
router.put("/update/:id", async (req, res) => {
    const appointmentId = req.params.id;
    const { patient, doctor, appointmentDate } = req.body;

    try {
        const appointment = await Appointment
            .findById(appointmentId);
        if (!appointment) {
            return res.status(404)
                .json({ message: "Appointment not found" });
        }

        appointment.patient = patient;
        appointment.doctor = doctor;
        appointment.appointmentDate = appointmentDate;

        await appointment.save();
        console.log(appointment);

        res.json(appointment);
    } catch (error) {
        console.error("Error updating appointment details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
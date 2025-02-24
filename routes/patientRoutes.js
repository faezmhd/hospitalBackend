const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// Get all patients
router.get("/get", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new patient
router.post("/add", async (req, res) => {
    const patient = new Patient({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
    });
    try {
        const newPatient = await patient.save();
        console.log(newPatient);
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a patient by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: "Patient deleted" });
    } catch (error) {
        console.error("Error deleting patient:", error);
        res.status(500).json({ message: error.message });
    }
});

// Update a patient by ID
router.put("/update/:id", async (req, res) => {
    const patientId = req.params.id;
    const { name, age, gender } = req.body;

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        patient.name = name;
        patient.age = age;
        patient.gender = gender;

        await patient.save();
        console.log(patient);

        res.json(patient);
    } catch (error) {
        console.error("Error updating patient details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
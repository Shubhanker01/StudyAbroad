import { signup } from "../services/auth";
import { displayNotification } from "../utils/toastmessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialRegisterState = {
    fullName: "",
    email: "",
    password: "",
    role: "student",
    targetCountries: ["Canada"],
    interestedFields: ["Science"],
    preferredIntake: "fall",
    maxBudgetUsd: 4000,
    englishTest: {
        exam: "IELTS",
        score: 7.5,
    },
};

export function useRegisterForm() {
    const [formData, setFormData] = useState(initialRegisterState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    // Field change handler
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    // English test nested object handler
    const handleTestChange = (key, value, type) => {
        setFormData((prev) => ({
            ...prev,
            englishTest: {
                ...prev.englishTest,
                [key]: type === "number" ? Number(value) : value,
            },
        }));
    };

    // Array toggle for countries and fields
    const handleArrayToggle = (key, item) => {
        setFormData((prev) => {
            const list = prev[key] || [];
            const updated = list.includes(item)
                ? list.filter((i) => i !== item)
                : [...list, item];
            return { ...prev, [key]: updated };
        });
    };

    // Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            console.log(formData)
            const response = await displayNotification(signup(formData));
            console.log("Registration successfull", response)
            navigate("/login");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed. Try again.";
            setError(errorMessage);
            console.error("Registration error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        isSubmitting,
        error,
        handleChange,
        handleTestChange,
        handleArrayToggle,
        handleSubmit,
    };
}
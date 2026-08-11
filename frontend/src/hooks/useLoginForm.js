import { login } from "../services/auth";
import { displayNotification } from "../utils/toastmessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialLoginState = {
    email: "",
    password: "",
};

export function useLoginForm() {
    const [formData, setFormData] = useState(initialLoginState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null)
        try {
            const res = await displayNotification(login(formData));
            const json = await res.data
            console.log(json.data.id)
            navigate(`/app/${json.data.id}`);
        } catch (err) {
            console.error("Login error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        isSubmitting,
        handleChange,
        handleSubmit,
        error
    };
}
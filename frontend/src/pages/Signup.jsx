import React from "react";
import { Link } from "react-router-dom";
import {
    GraduationCap,
    User,
    Mail,
    Lock,
    Globe,
    BookOpen,
    Calendar,
    DollarSign,
    Award,
    ArrowRight,
    AlertCircle,
} from "lucide-react";
import { useRegisterForm } from "../hooks/useRegisterForm";

const countryOptions = ["Canada", "USA", "UK", "Australia", "Germany"];
const fieldOptions = ["Science", "Engineering", "Business", "Arts", "Health"];

export default function Register() {
    const {
        formData,
        isSubmitting,
        error,
        handleChange,
        handleTestChange,
        handleArrayToggle,
        handleSubmit,
    } = useRegisterForm();

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-xl">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <GraduationCap className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight">
                        StudyAbroad<span className="text-blue-500">HQ</span>
                    </span>
                </div>

                <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
                    Create Student Account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300">
                        Sign in here
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
                <div className="bg-slate-800/80 backdrop-blur-md py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-700/60">

                    {/* ERROR ALERT BANNER */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 flex items-center gap-3 text-red-400 text-sm">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300">Full Name</label>
                            <div className="mt-1 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <User className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Shub Thapa"
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300">Email Address</label>
                            <div className="mt-1 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="shub@gmail.com"
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300">Password</label>
                            <div className="mt-1 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                        </div>

                        {/* Target Countries */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2 items-center gap-1.5">
                                <Globe className="w-4 h-4 text-blue-400" /> Target Countries
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {countryOptions.map((country) => {
                                    const isSelected = formData.targetCountries.includes(country);
                                    return (
                                        <button
                                            type="button"
                                            key={country}
                                            onClick={() => handleArrayToggle("targetCountries", country)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${isSelected
                                                    ? "bg-blue-600 text-white shadow-md"
                                                    : "bg-slate-900/80 text-slate-400 border border-slate-700 hover:border-slate-500"
                                                }`}
                                        >
                                            {country}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Interested Fields */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2 items-center gap-1.5">
                                <BookOpen className="w-4 h-4 text-blue-400" /> Interested Fields
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {fieldOptions.map((field) => {
                                    const isSelected = formData.interestedFields.includes(field);
                                    return (
                                        <button
                                            type="button"
                                            key={field}
                                            onClick={() => handleArrayToggle("interestedFields", field)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${isSelected
                                                    ? "bg-indigo-600 text-white shadow-md"
                                                    : "bg-slate-900/80 text-slate-400 border border-slate-700 hover:border-slate-500"
                                                }`}
                                        >
                                            {field}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Intake & Budget Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1 items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-blue-400" /> Preferred Intake
                                </label>
                                <select
                                    name="preferredIntake"
                                    value={formData.preferredIntake}
                                    onChange={handleChange}
                                    className="block w-full py-2.5 px-3 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                >
                                    <option value="fall">Fall</option>
                                    <option value="spring">Spring</option>
                                    <option value="summer">Summer</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1 items-center gap-1.5">
                                    <DollarSign className="w-4 h-4 text-emerald-400" /> Max Budget (USD)
                                </label>
                                <input
                                    type="number"
                                    name="maxBudgetUsd"
                                    value={formData.maxBudgetUsd}
                                    onChange={handleChange}
                                    placeholder="4000"
                                    className="block w-full py-2.5 px-3 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                        </div>

                        {/* English Test Group */}
                        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/80 space-y-4">
                            <label className="block text-sm font-semibold text-slate-200 items-center gap-1.5">
                                <Award className="w-4 h-4 text-amber-400" /> English Proficiency Test
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Exam</label>
                                    <select
                                        value={formData.englishTest.exam}
                                        onChange={(e) => handleTestChange("exam", e.target.value, "string")}
                                        className="block w-full py-2 px-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                                    >
                                        <option value="IELTS">IELTS</option>
                                        <option value="TOEFL">TOEFL</option>
                                        <option value="Duolingo">Duolingo</option>
                                        <option value="PTE">PTE</option>
                                        <option value="None">None</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Score</label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={formData.englishTest.score}
                                        onChange={(e) => handleTestChange("score", e.target.value, "number")}
                                        placeholder="7.5"
                                        className="block w-full py-2 px-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
                        >
                            <span>{isSubmitting ? "Creating Account..." : "Create Account"}</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { useLoginForm } from "../hooks/useLoginForm";

export default function Login() {
    const { formData, isSubmitting, error, handleChange, handleSubmit } = useLoginForm();

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <GraduationCap className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight">
                        StudyAbroad<span className="text-blue-500">HQ</span>
                    </span>
                </div>

                <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
                    Welcome Back
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold text-blue-400 hover:text-blue-300">
                        Register here
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-slate-800/80 backdrop-blur-md py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-700/60">

                    {/* ERROR ALERT BANNER */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 flex items-center gap-3 text-red-400 text-sm">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

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
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-slate-300">Password</label>
                                <a href="#forgot" className="text-xs font-semibold text-blue-400 hover:text-blue-300">
                                    Forgot password?
                                </a>
                            </div>
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
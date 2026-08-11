import React from "react";
import { useNavigate } from "react-router-dom";
import {
    GraduationCap,
    Globe,
    DollarSign,
    Award,
    ArrowRight,
    CheckCircle2,
    BookOpen,
    UserCheck,
    Building2,
    LogIn,
    UserPlus
} from "lucide-react";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

            {/* --- NAVIGATION BAR --- */}
            <header className="bg-slate-900 border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto flex items-center justify-between">

                    {/* Logo */}
                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-extrabold text-white tracking-tight">
                            StudyAbroad<span className="text-blue-500">HQ</span>
                        </span>
                    </div>

                    {/* Auth Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/login")}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>Login</span>
                        </button>

                        <button
                            onClick={() => navigate("/signup")}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-md"
                        >
                            <UserPlus className="w-4 h-4" />
                            <span>Register</span>
                        </button>
                    </div>

                </div>
            </header>

            {/* --- HERO SECTION --- */}
            <section className="relative overflow-hidden bg-linear-to-b from-slate-900 via-indigo-950 to-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center space-y-8">

                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 px-4 py-1.5 rounded-full text-blue-300 text-sm font-medium">
                        <Award className="w-4 h-4 text-blue-400" />
                        <span>Your Portal to Higher Education Worldwide</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                        Discover & Apply to Global Universities <br />
                        <span className="bg-linear-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                            All in One Unified Platform
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-slate-300 text-lg sm:text-xl leading-relaxed">
                        StudyAbroadHQ simplifies the international student journey. Discover degree programs, align your budget, verify English test requirements, and track applications seamlessly.
                    </p>

                    {/* Primary Call to Action */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button
                            onClick={() => navigate("/register")}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-xl transition shadow-xl flex items-center justify-center gap-2"
                        >
                            <span>Create Free Account</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition border border-white/20 flex items-center justify-center gap-2"
                        >
                            <span>Sign In</span>
                        </button>
                    </div>

                    {/* Platform Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-white/10 max-w-4xl mx-auto">
                        <div>
                            <div className="text-3xl font-bold text-white">10,000+</div>
                            <div className="text-sm text-slate-400">Programs Cataloged</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">500+</div>
                            <div className="text-sm text-slate-400">Partner Universities</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">30+</div>
                            <div className="text-sm text-slate-400">Study Destinations</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">$10M+</div>
                            <div className="text-sm text-slate-400">Scholarships Listed</div>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- WHAT THE APP IS ABOUT --- */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">

                <div className="text-center space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                        What Is StudyAbroadHQ?
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        A comprehensive web application engineered to bridge the gap between international applicants and global universities.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Program Catalog</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Explore thousands of Bachelor’s, Master’s, and PhD degree programs across top education destinations like Canada, the USA, the UK, and Australia.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Financial Transparency</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Clear breakdowns of tuition fees in USD and instantly discover programs offering full or partial scholarships to keep education affordable.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                            <UserCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Profile Matching</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Match your personal academic profile, IELTS, TOEFL, or Duolingo score against university prerequisites before submitting applications.
                        </p>
                    </div>

                </div>

                {/* Highlight Banner */}
                <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-bold">
                            Built for Students, Trusted by Institutions
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                            Whether you are looking for upcoming Fall or Spring intakes, our centralized portal keeps all program information updated in real-time.
                        </p>
                        <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-2 text-slate-200">
                                <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                <span>Verified university requirements</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-200">
                                <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                <span>Real-time scholarship notifications</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                        <button
                            onClick={() => navigate("/signup")}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg text-center"
                        >
                            Get Started Now
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3.5 px-6 rounded-xl transition border border-slate-700 text-center"
                        >
                            Sign In
                        </button>
                    </div>
                </div>

            </section>

            {/* --- FOOTER CTA --- */}
            <footer className="bg-slate-100 border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Ready to take the next step?</h3>
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-xl transition shadow"
                    >
                        Register Account
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold px-6 py-2.5 rounded-xl transition"
                    >
                        Login
                    </button>
                </div>
                <p className="text-xs text-slate-500 pt-6">
                    &copy; {new Date().getFullYear()} StudyAbroadHQ. All rights reserved.
                </p>
            </footer>

        </div>
    );
}
import React from "react";
import {
    Users,
    GraduationCap,
    FileCheck2,
    Globe2,
    Clock,
    Send,
    CheckCircle2,
    AlertCircle,
    Loader2
} from "lucide-react";
import { useDashboardData } from '../hooks/useDashboardData';

// Helper for status formatting & badges
const getStatusMeta = (status) => {
    switch (status) {
        case "submitted":
            return {
                label: "Submitted",
                color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
                icon: Send,
            };
        case "under-review":
            return {
                label: "Under Review",
                color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
                icon: Clock,
            };
        case "accepted":
            return {
                label: "Accepted",
                color: "text-blue-400 bg-blue-500/10 border-blue-500/30",
                icon: CheckCircle2,
            };
        default:
            return {
                label: status,
                color: "text-slate-400 bg-slate-500/10 border-slate-500/30",
                icon: AlertCircle,
            };
    }
};

export default function DashboardOverview() {
    const { data, isLoading, error } = useDashboardData();
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[350px] gap-3 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-sm font-medium">Fetching dashboard metrics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 max-w-lg mx-auto mt-12 space-y-4 text-center">
                <AlertCircle className="w-10 h-10 mx-auto text-red-500" />
                <div>
                    <h3 className="font-bold text-lg text-white">Error loading data</h3>
                </div>
            </div>
        );
    }
    const {
        totalStudents = 0,
        totalPrograms = 0,
        totalApplications = 0,
        statusBreakdown = [],
        topCountries = [],
    } = data;

    const statCards = [
        {
            title: "Total Students",
            value: totalStudents,
            icon: Users,
            color: "from-blue-600/20 to-blue-500/5 text-blue-400 border-blue-500/20",
        },
        {
            title: "Total Programs",
            value: totalPrograms,
            icon: GraduationCap,
            color: "from-purple-600/20 to-purple-500/5 text-purple-400 border-purple-500/20",
        },
        {
            title: "Total Applications",
            value: totalApplications,
            icon: FileCheck2,
            color: "from-emerald-600/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20",
        },
    ];

    return (
    <div className="space-y-8 font-sans">

        {/* Header */}
        <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
                Dashboard Overview
            </h2>
            <p className="text-sm text-slate-400 mt-1">
                Real-time metrics for students, program choices, and application pipelines.
            </p>
        </div>

        {/* Top Level Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statCards.map((card) => {
                const Icon = card.icon;
                return (
                    <div
                        key={card.title}
                        className={`p-6 rounded-2xl bg-gradient-to-br ${card.color} border backdrop-blur-md flex items-center justify-between shadow-lg`}
                    >
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                {card.title}
                            </p>
                            <p className="text-3xl font-extrabold text-white mt-2">
                                {card.value}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-900/60 flex items-center justify-center border border-slate-700/50">
                            <Icon className="w-6 h-6" />
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Breakdowns Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Application Status Breakdown */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Clock className="w-5 h-5 text-amber-400" /> Application Pipeline
                    </h3>
                    <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                        {statusBreakdown.length} Stages Active
                    </span>
                </div>

                <div className="space-y-3">
                    {statusBreakdown.length > 0 ? (
                        statusBreakdown.map((item) => {
                            const meta = getStatusMeta(item._id);
                            const StatusIcon = meta.icon;
                            const percentage = totalApplications
                                ? Math.round((item.count / totalApplications) * 100)
                                : 0;

                            return (
                                <div
                                    key={item._id}
                                    className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2 rounded-lg border ${meta.color}`}
                                        >
                                            <StatusIcon className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-200">
                                            {meta.label}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-24 bg-slate-900 rounded-full h-2 border border-slate-800 overflow-hidden hidden sm:block">
                                            <div
                                                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-bold text-white w-6 text-right">
                                            {item.count}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-sm text-slate-500 py-4 text-center">
                            No application data available.
                        </p>
                    )}
                </div>
            </div>

            {/* Top Target Countries */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Globe2 className="w-5 h-5 text-blue-400" /> Top Destinations
                    </h3>
                    <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                        {topCountries.length} Countries
                    </span>
                </div>

                <div className="space-y-3">
                    {topCountries.length > 0 ? (
                        topCountries.map((country) => (
                            <div
                                key={country._id}
                                className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                                        {country._id.substring(0, 2).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-semibold text-slate-200">
                                        {country._id}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-400">Applications:</span>
                                    <span className="text-sm font-bold text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
                                        {country.count}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-slate-500 py-4 text-center">
                            No country preference data available.
                        </p>
                    )}
                </div>
            </div>

        </div>
    </div>
    );
}
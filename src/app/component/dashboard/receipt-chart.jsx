"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Center text plugin (Total Receipts + number)
const centerTextPlugin = (total) => ({
    id: "centerTextPlugin",
    afterDraw(chart) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        if (!meta?.data?.length) return;

        const x = meta.data[0].x;
        const y = meta.data[0].y;

        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Title
        ctx.font = "500 14px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillStyle = "#9AA3AF";
        ctx.fillText("Total Receipts", x, y - 10);

        // Value
        ctx.font = "700 26px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(total.toLocaleString(), x, y + 14);

        ctx.restore();
    },
});

const ReceiptChart = ({ total = 54765, paid = 72, loan = 28 }) => {
    // Two intentional gaps (top & bottom)
    // Keep small numbers so gaps are visible but not huge.
    const GAP = 6;

    const data = {
        labels: ["Gap", "Paid", "Gap", "Loan"],
        datasets: [
            {
                data: [GAP, paid, GAP, loan],
                backgroundColor: [
                    "rgba(0,0,0,0)", // gap (transparent)
                    "#277DFF",       // paid (dark blue)
                    "rgba(0,0,0,0)", // gap (transparent)
                    "#8BC9FF",       // loan (light blue)
                ],
                borderWidth: 0,
                borderRadius: 999,
                spacing: 6,       // adds separation between segments
                cutout: "85%",    // thickness similar to screenshot
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        rotation: -90, // start from top
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                filter: (ctx) => ctx.dataIndex !== 0 && ctx.dataIndex !== 2, // disable tooltips on gaps
                callbacks: {
                    label: (ctx) => {
                        const label = ctx.dataIndex === 1 ? "Paid" : "Loan";
                        return `${label}: ${ctx.raw}%`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-full flex flex-col items-center gap-6">
            {/* Chart container */}
            <div className="w-[320px] h-80 mt-12">
                <Doughnut
                    data={data}
                    options={options}
                    plugins={[centerTextPlugin(total)]}
                />
            </div>

            {/* Legend cards */}
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
                {/* Paid */}
                <div className="bg-[#1E2024] h-[99px] border border-[#2A2F3A] px-6 py-3 rounded-2xl flex justify-center items-center gap-3">
                    <span className="w-3 h-3 bg-[#277DFF] rounded-full"></span>
                    <div>
                        <p className="text-white text-lg font-semibold">{paid}%</p>
                        <p className="text-[#6D758F] text-sm mt-1">Paid</p>
                    </div>
                </div>

                {/* Loan */}
                <div className="bg-[#1E2024] h-[99px] border border-[#2A2F3A] px-6 py-3 rounded-2xl flex justify-center items-center gap-3">
                    <span className="w-3 h-3 bg-[#8BC9FF] rounded-full"></span>
                    <div>
                        <p className="text-white text-lg font-semibold">{loan}%</p>
                        <p className="text-[#6D758F] text-sm mt-1">Loan</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiptChart;

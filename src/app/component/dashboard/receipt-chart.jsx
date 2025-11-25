"use client";
import React from "react";
import Chart from "react-apexcharts";

const ReceiptChart = ({ total = 54765, paid = 72, loan = 28 }) => {
    const series = [paid, loan];

    const options = {
        chart: {
            type: "radialBar",
            sparkline: { enabled: true },
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                hollow: {
                    size: "60%",
                },
                track: {
                    background: "#1E1E1E",
                },
                dataLabels: {
                    name: {
                        show: true,
                        offsetY: -10,
                        color: "#b5b5b5",
                        fontSize: "14px",
                        text: "Total Receipts",
                    },
                    value: {
                        show: true,
                        fontSize: "28px",
                        fontWeight: 600,
                        color: "#fff",
                        formatter: () => total.toLocaleString(),
                    },
                },
            },
        },

        labels: ["Paid", "Loan"],

        colors: ["#277DFF", "#8BC9FF"], // Dark Blue + Light Blue
        stroke: { lineCap: "round" },
    };

    return (
        <div className="w-full flex flex-col items-center gap-6">
            <div className="flex justify-center items-center">
                <Chart options={options} series={series} type="radialBar" height={460} />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-4 w-full mt-5">
                {/* Paid */}
                <div className="bg-[#1E2024] h-[99px] border border-(--grey1) px-6 py-3 rounded-2xl text-center flex  justify-center items-center gap-3">
                    <span className="w-3 h-3 bg-[#277DFF] rounded-full"></span>
                    <div >
                        <p className="text-white text-lg font-semibold">{paid}%</p>
                        <p className="text-[#6D758F] text-sm mt-1">Paid</p>
                    </div>
                </div>

                {/* Loan */}
                <div className="bg-[#1E2024] h-[99px] border border-(--grey1) px-6 py-3 rounded-2xl text-center flex  justify-center items-center gap-3">
                    <span className="w-3 h-3 bg-[#277DFF] rounded-full"></span>
                    <div >
                        <p className="text-white text-lg font-semibold">{loan}%</p>
                        <p className="text-[#6D758F] text-sm mt-1">Loan</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiptChart;

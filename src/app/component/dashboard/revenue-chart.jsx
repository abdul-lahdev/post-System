"use client";
import React from "react";
import dynamic from "next/dynamic";

// Load ApexCharts only on client
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const RevenueChart = () => {
    const dataValues = [1500, 2500, 1800, 1300, 3700, 3000, 1600, 2500, 1900, 1100, 1100, 3100];
    const maxValue = Math.max(...dataValues);

    const [state] = React.useState({
        series: [
            {
                name: "Net Profit",
                data: dataValues,
            },
        ],

        options: {
            chart: {
                type: "bar",
                height: 350,
                toolbar: { show: false },
                background: "transparent",
            },

            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "80%",
                    borderRadius: 10,
                    borderRadiusApplication: "around",
                },
            },

            colors: ["#78B3FF"],

            fill: {
                type: "gradient",
                gradient: {
                    shade: "light",
                    type: "vertical",
                    shadeIntensity: 0.3,
                    gradientToColors: ["#3290FF"],
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                },
            },
            dataLabels: {
                enabled: true,
                formatter: (value) => {
                    const percentage = Math.round((value / maxValue) * 100);
                    return `${percentage}%`;
                },
                style: {
                    colors: ["#FFFFFF"],
                    fontSize: "12px",
                    fontWeight: 600,
                    position: 'bottom',
                },
                position: 'bottom',
                offsetY: -20, // move label upward
            },

            stroke: {
                show: false,
            },

            xaxis: {
                categories: [
                    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
                ],
                labels: {
                    style: {
                        colors: "#D0D0D0",
                        fontSize: "12px",
                    },
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },

            yaxis: {
                min: 0,
                max: 5000,
                tickAmount: 5,
                labels: {
                    style: {
                        colors: "#A8A8A8",
                        fontSize: "12px",
                    },
                    formatter: (value) => value / 1000 + "k",
                },
            },

            grid: {
                borderColor: "#4A4A4A",
                strokeDashArray: 3,
                xaxis: { lines: { show: false } },
                yaxis: { lines: { show: true } },
            },

            tooltip: {
                theme: "dark",
                y: {
                    formatter: (val) => `${val / 1000}k`,
                },
                style: {
                    fontSize: "12px",
                },
            },
        },
    });


    return (
        <div>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height={450}
            />
        </div>
    );
};

export default RevenueChart;

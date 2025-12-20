import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    ReferenceLine,
} from "recharts";
import { useChartData, type ChartDataPoint } from "@/hooks/useChartData";

export type StockData = ChartDataPoint;

interface StockChartProps {
    data: StockData[];
    height?: number;
    referenceLine?: {
        y: number;
        label?: string;
        color?: string;
    };
}

const StockChart = ({ data, height = 500, referenceLine }: StockChartProps) => {
    const { formattedData, lineColor, barColor, trend } = useChartData(data);

    return (
        <div style={{ width: "100%", height, display: 'flex', flexDirection: 'column' }}>
            <div className="mb-2 flex items-center gap-2 px-2">
                <span className="text-sm font-medium text-muted-foreground">Trend:</span>
                <span className={`text-sm font-bold ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-primary'}`}>
                    {trend.toUpperCase()}
                </span>
            </div>
            <div style={{ flex: 2, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={formattedData}
                        syncId="stockId"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="var(--color-border)" />
                        <XAxis dataKey="date" hide />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip
                            contentStyle={{ backgroundColor: "var(--color-popover)", borderColor: "var(--color-border)", color: "var(--color-popover-foreground)" }}
                            itemStyle={{ color: "var(--color-popover-foreground)" }}
                            labelStyle={{ color: "var(--color-muted-foreground)" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="close"
                            stroke={lineColor}
                            strokeWidth={2}
                            dot={false}
                            animationDuration={500}
                        />
                        {referenceLine && (
                            <ReferenceLine
                                y={referenceLine.y}
                                label={{
                                    value: referenceLine.label,
                                    fill: referenceLine.color || "var(--color-destructive)",
                                    position: 'insideTopRight'
                                }}
                                stroke={referenceLine.color || "var(--color-destructive)"}
                                strokeDasharray="3 3"
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div style={{ flex: 1, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={formattedData}
                        syncId="stockId"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="var(--color-border)" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ backgroundColor: "var(--color-popover)", borderColor: "var(--color-border)", color: "var(--color-popover-foreground)" }}
                        />
                        <Bar dataKey="volume" fill={barColor} opacity={0.8} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StockChart;

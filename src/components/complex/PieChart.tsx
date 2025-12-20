import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export interface PieChartProps {
    data: Record<string, any>[];
    dataKey: string;
    nameKey: string;
    colors?: string[];
    height?: number;
    className?: string;
}

const DEFAULT_COLORS = [
    "var(--color-primary)",
    "var(--color-secondary)",
    "var(--color-accent)",
    "var(--color-muted)",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
];

export const PieChart = ({
    data,
    dataKey,
    nameKey,
    colors = DEFAULT_COLORS,
    height = 300,
    className,
}: PieChartProps) => {
    return (
        <div style={{ height }} className={className}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey={dataKey}
                        nameKey={nameKey}
                        label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                                stroke="var(--color-background)"
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "var(--color-popover)",
                            borderColor: "var(--color-border)",
                            color: "var(--color-popover-foreground)",
                        }}
                        itemStyle={{ color: "var(--color-popover-foreground)" }}
                    />
                    <Legend />
                </RechartsPieChart>
            </ResponsiveContainer>
        </div>
    );
};

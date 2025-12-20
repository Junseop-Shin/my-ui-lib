import { useMemo } from "react"

export interface ChartDataPoint {
    date: string
    close: number
    volume: number
    [key: string]: any
}

interface UseChartDataReturn {
    formattedData: ChartDataPoint[]
    trend: "up" | "down" | "neutral"
    lineColor: string
    barColor: string
}

export function useChartData(data: ChartDataPoint[]): UseChartDataReturn {
    const trend = useMemo(() => {
        if (!data || data.length < 2) return "neutral"
        const first = data[0].close
        const last = data[data.length - 1].close
        return last > first ? "up" : last < first ? "down" : "neutral"
    }, [data])

    const colors = useMemo(() => {
        if (trend === "up") {
            return { line: "var(--color-success)", bar: "var(--color-success)" }
        } else if (trend === "down") {
            return { line: "var(--color-destructive)", bar: "var(--color-destructive)" }
        }
        return { line: "var(--color-primary)", bar: "var(--color-primary)" }
    }, [trend])

    return {
        formattedData: data,
        trend,
        lineColor: colors.line,
        barColor: colors.line, // Using same color for simplicity or can vary
    }
}

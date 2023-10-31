export type UserData = {
    conservative: number,
    conservativePct: string,
    neutral: number,
    neutralPct: string,
    liberal: number
    liberalPct: string,
}
  
// remove nans on first load
export const nanify = (v: string) => {
if (v == "NaN") return "N/A"
return v
}
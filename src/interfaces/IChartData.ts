import IHeadingChartData from "./IHeadingChartData";
import ISpCalculation from "./ISignalProgramCalculation";

export default interface IChartData{
    signalPrograms: ISpCalculation[],
    time: Date,
    data: IHeadingChartData[]
}
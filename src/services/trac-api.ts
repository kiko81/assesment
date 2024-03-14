import axios from "axios";
import cfg from "../config";
import IController from "../interfaces/IController";

const client = () => axios.create({ baseURL: cfg.baseUrl });

const get = async (route: string) => {
    const result = await (client()).get(route);
    return result.data;
};

const post = async (route: string, body: any) => {
    const result = await (client()).post(route, body);
    return result.data;
};

const put = async (route: string, body: any) => {
    const result = await (client()).put(route, body);
    return result.data;
};

export default class TracApi {
    static getGraphData= async (id: number, from: Date, to: Date) => await post('calculate/simulation', {id, from, to})
    static controllerList = async () =>
        await get('controllers');
    static addController = async (model: IController) => await post('controllers', model)
    static editController = async (model: IController) => await put('controllers', model)

    static getHeadingsForController = async (controller: number) =>
        await get(`headings/${controller}`);
    static addHeading = async (model: any) => await post('headings', model);
    static editHeading = async (model: any) => await put('headings', model);

    static addSp = async (body: any) => await post('signalprograms', body)
    static editSp = async (body: any) => await put('signalprograms', body)

    static addLine = async (body: any) => await post('lines', body)
    static editLine = async (body: any) => await put('lines', body)
}
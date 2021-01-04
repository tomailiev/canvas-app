import { IPage } from "./page";

export interface IBook {
    pages: IPage[];
    author: string;
    title: string;
    compiler: string;
    _id: string;
}
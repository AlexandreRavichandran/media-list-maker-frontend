import { ListElement } from "../list/list-element";

export interface Music extends ListElement {

    id: number;
    artistName: string;
    apiCode: string;
    type: number;

}
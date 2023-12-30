import { environment } from "src/environments/environment";
import { BaseSearchRequest } from "../models/base-search-request";
import { HttpParams } from "@angular/common/http";

export abstract class AbstractService {

    private baseUrl: string = environment.apiUrl;
    private serviceUrl: string;

    constructor(serviceUrl: string) {
        this.serviceUrl = !!serviceUrl ? serviceUrl : '';
    }

    protected getBaseUrl(): string {
        return this.baseUrl;
    }

    protected getResourceUrl(): string {
        return `${this.getBaseUrl() + this.serviceUrl}`;
    }

    protected getHttpParamByQueryObject(queryObject: BaseSearchRequest): HttpParams {

        let httpParam: HttpParams = new HttpParams();

        for (const [key, value] of Object.entries(queryObject)) {
           httpParam = httpParam.set(key, value);
        }

        return httpParam;
    }
}
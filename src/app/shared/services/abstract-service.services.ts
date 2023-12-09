import { environment } from "src/environments/environment";

export abstract class AbstractService {

    private baseUrl: string = environment.apiUrl;
    private serviceUrl: string;

    constructor(serviceUrl: string) {
        this.serviceUrl = !!serviceUrl ? serviceUrl : '';
    }

    getBaseUrl(): string {
        return this.baseUrl;
    }

    getResourceUrl(): string {
        return `${this.baseUrl}${this.serviceUrl}`;
    }
}
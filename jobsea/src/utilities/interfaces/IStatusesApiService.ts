import IApiService from "./IApiService";
import { StatusOption, ApiData, ApiResponse } from "../../customObjects/customObjects";

interface IStatusesApiService {
    get(url:string):Promise<ApiData<StatusOption> | ApiResponse> 
}

export default IStatusesApiService
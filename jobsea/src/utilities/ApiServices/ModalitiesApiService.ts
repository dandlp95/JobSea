import IModalityApiService from "../interfaces/IModalitiesApiService";
import { ApiData, Modality } from "../../customTypes/responseTypes";
import ApiService from "./ApiService";

class ModalityApiService extends ApiService<Modality> implements IModalityApiService {
    constructor(){
        super()
    }
    getModalities(): Promise<ApiData<Modality []> | ApiData<null>> {
        return super.get('modalities', null)
    }
}

export default new ModalityApiService ();
import ApiRequestService from "../apiRequest.service";

export default class AuthenticationService extends ApiRequestService{
    override endpoint = 'auth'
    override target = 'login'



}
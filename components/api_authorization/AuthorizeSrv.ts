import axios from 'axios';
import { UserIdentityInfo } from '../../models/UserIdentityInfo';

export const authorizeSrv = {
    async getUserInfo(token: string, url: string) {
        try {
                const config = {
                    headers: { Authorization: `Bearer ${token}`}
                };
                return await axios.get<UserIdentityInfo>(url, config)
                    .then(response => response.data);
        }
        catch(e) {
            console.log("error w authorizeSrv: " + e);
        }
    }
};
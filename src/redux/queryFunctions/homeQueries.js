import { apiRequest } from "../api/request";

export const fetchHomePageData = () => {
    return apiRequest('/home-page/view-homepage-content');
};
import api from './api';
import type { CreateUrlRequest, UrlResponse, } from '../types/url';
import { API_URLS } from '../types/apiRoutes/apiUrls';
import { type PaginatedUrlsResponse } from '../types/url';

export const createShortUrl = async (
    data: CreateUrlRequest,
): Promise<UrlResponse> => {
    const response = await api.post<UrlResponse>(
        API_URLS.URLS,
        data,
    );

    return response.data;
};


export const getUrls = async (
    page = 1,
    limit = 10,
): Promise<PaginatedUrlsResponse> => {
    const response = await api.get<PaginatedUrlsResponse>(
        API_URLS.URLS,
        {
            params: {
                page,
                limit,
            },
        },
    );

    return response.data;
};
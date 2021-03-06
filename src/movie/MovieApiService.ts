import {
  CreateMovieRequest,
  EntityReference,
  ListingRequest,
  MovieContract,
  MovieSearchResponse,
  UpdateMovieRequest,
} from 'collard_admin_models';
import { MovieListingFilters } from './listing/filters/MovieListingFilters';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import serviceDiscovery from '../config/ServiceDiscovery';
export class MovieApiService {
  private baseUrl: string = '';
  private protocol = 'https';
  constructor() {
    const baseUrl = serviceDiscovery.getServiceUrl().ApiGatewayUrl;
    this.baseUrl = `${this.protocol}://${baseUrl}`;
  }
  save(movie: CreateMovieRequest): Promise<void> {
    const requestUrl = `${this.baseUrl}/movie/create`;
    return axios.post(requestUrl, movie);
  }

  getById(id: string): Promise<AxiosResponse<MovieContract>> {
    const requestUrl = `${this.baseUrl}/movie`;
    const config: AxiosRequestConfig = {
      params: {
        id,
      },
    };
    return axios.get(requestUrl, config);
  }

  uploadPosters(files: File[]):Promise<AxiosResponse<string[]>> {
    const formData: FormData = new FormData();
    const requestUrl = `${this.baseUrl}/movie/upload`;
    files.forEach((f) => {
      formData.append('files', f);
    });
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return axios.post(requestUrl, formData, { headers });
  }

  fetchListingData(
    filters: MovieListingFilters
  ): Promise<AxiosResponse<MovieSearchResponse>> {
    const requestUrl = `${this.baseUrl}/movie/page`;
    const listingRequest: ListingRequest = {
      PageNumber: filters.pageNumber.toString(),
      PageSize: filters.pageSize.toString(),
    };
    const config: AxiosRequestConfig = {
      params: {
        ...listingRequest,
      },
    };
    return axios.get(requestUrl, config);
  }

  update(request: UpdateMovieRequest): Promise<AxiosResponse<void>> {
    const requestUrl = `${this.baseUrl}/movie/update`;
    return axios.put(requestUrl, request) as Promise<AxiosResponse<void>>;
  }

  delete(id: string) {
    const requestUrl = `${this.baseUrl}/movie/delete?id=${id}`;
    return axios.delete(requestUrl);
  }

  searchDirectors(query: string): Promise<AxiosResponse<EntityReference[]>> {
    const requestUrl = `${this.baseUrl}/director/search`;
    const config: AxiosRequestConfig = {
      params: {
        query,
      },
    };

    return axios.get(requestUrl, config);
  }

  searchActors(query: string): Promise<AxiosResponse<EntityReference[]>> {
    const requestUrl = `${this.baseUrl}/actor/search`;
    const config: AxiosRequestConfig = {
      params: {
        query,
      },
    };

    return axios.get(requestUrl, config);
  }

  fetchCountries(): Promise<AxiosResponse<EntityReference[]>> {
    const requestUrl = `${this.baseUrl}/country/get_all`;
    return axios.get(requestUrl);
  }

  fetchLanguages(): Promise<AxiosResponse<EntityReference[]>> {
    const requestUrl = `${this.baseUrl}/language/get_all`;
    return axios.get(requestUrl);
  }
}

import { Injectable } from '@angular/core';
import { UserParams } from 'src/app/shared/types';

interface RequestParams<TRequestData = undefined> extends Omit<RequestInit, 'body'> {
   data?: TRequestData;
}
   
@Injectable({ providedIn: 'root' })
   
export class HTTPClientService { 

  // returns headers for the fetch request
  getHeaders(params: UserParams) {
    return {
      'rs-uid': params.uid || '',
      'rs-email': params.email || '',
      Authorization: 'Bearer ' + params.token,
    };
  }

  // request with no response data needed
  async simpleRequest<TRequestData = undefined>(url: string, params: RequestParams<TRequestData>): Promise<void> {
    const response = await this.request<TRequestData>(url, params);
      if (!response.ok) {
        try {
          const { message } = await response.json();
          return Promise.reject(message ?? 'Response error');
        } catch (e) {
          return Promise.reject('Error body parse failed');
        }
      }
    }  
    
  // request with response data  
  async jsonRequest<TResponseData, TRequestData = undefined>(url: string, params: RequestParams<TRequestData>): Promise<TResponseData> {
    const response = await this.request<TRequestData>(url, params);
    if (response.ok) {
      try {
        const responseData = await response.json();
        return responseData as TResponseData;
      } catch (e) {
        return Promise.reject('Could not parse response');
      }
    } else {
      try {
        const { message } = await response.json();
        return Promise.reject(message ?? 'Response error');
      } catch (e) {
        return Promise.reject('Error body parse failed');
      }
    }
  }

  // common request function
  private async request<TRequestData = undefined>(url: string, params: RequestParams<TRequestData>): Promise<Response> {
    const { data, method = 'GET', headers = {}, ...restParams } = params;
    return fetch(url, 
      {
        ...restParams,
        ...(data && (method === 'GET' || method === 'DELETE') ? {} : { body: JSON.stringify(data) }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...headers
        },
        method: method,
      });
    }
  }   
         
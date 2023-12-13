import { Injectable } from '@angular/core';

interface RequestParams<TRequestData = undefined> extends Omit<RequestInit, 'body'> {
   data?: TRequestData;
}
   
@Injectable({ providedIn: 'root' })
   
export class HTTPClientService { 

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
         
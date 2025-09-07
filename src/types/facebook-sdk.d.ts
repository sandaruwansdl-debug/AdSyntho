declare module 'facebook-nodejs-business-sdk' {
  export class FacebookAdsApi {
    constructor(accessToken: string, appSecret?: string, appId?: string);
    static init(accessToken: string, appSecret?: string, appId?: string): FacebookAdsApi;
    getUser(): Promise<any>;
  }
  
  export class AdAccount {
    constructor(id: string, data?: any);
    getCampaigns(fields?: string[], params?: any): Promise<any>;
    getInsights(fields?: string[], params?: any): Promise<any>;
  }
  
  export class Campaign {
    constructor(id: string, data?: any);
    static get(id: string, fields?: string[], params?: any): Promise<any>;
  }
}

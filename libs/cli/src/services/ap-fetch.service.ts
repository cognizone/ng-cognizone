import { ApplicationProfile } from '@cognizone/application-profile';
import { extractOneSourceFromElasticResponse } from '@cognizone/model-utils';
import axios from 'axios';

import { JsonService } from './json.service';

export class ApFetchService {
  static async fetchFromElastic({ id, index, url, headers }: ElasticFetchOptions): Promise<ApplicationProfile> {
    headers = { 'Content-Type': 'application/json', ...headers };
    const fullUrl = `${url}/${index}/_search`;
    const body = {
      query: {
        terms: {
          _id: [id],
        },
      },
    };
    const { data } = await axios.post(fullUrl, body, { headers });
    const source = extractOneSourceFromElasticResponse(data) as { json: string };
    const ap = JSON.parse(source.json) as ApplicationProfile;
    return ap;
  }

  static async getFromUrl({ url, headers }: ApiGetOptions): Promise<ApplicationProfile> {
    headers = headers ?? {};
    const { data } = await axios.get(url, { headers });
    return data;
  }

  static async getFromFile(path: string): Promise<ApplicationProfile> {
    return JsonService.readJsonSync(path, { strict: true });
  }
}

export type ElasticFetchOptions = {
  url: string;
  index: string;
  id: string;
  headers?: { [key: string]: string };
};

export type ApiGetOptions = {
  url: string;
  headers?: { [key: string]: string };
};

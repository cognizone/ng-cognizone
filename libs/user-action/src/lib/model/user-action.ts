/* eslint-disable @typescript-eslint/naming-convention */
export interface UserAction {
  id: string;
  name: string;
  userFullName: string;
  userIv: string;
  'http.userPrincipal': string;
  'http.headers': { [key: string]: string[] };
  'http.remoteHost': string;
  'http.requestURI': string;
  'http.requestURL': string;
  'http.actionPath': string;
  'http.parameters': {};
  'http.method': string;
  methodClass: string;
  methodName: string;
  start: string;
  end: string;
  success: boolean;
  actionInfo: {};
  stackTrace?: string[];
  _userIv?: string;
  _userId?: string;
  _userFullName?: string;
}

import * as AxiosUtil from '../../app/util/AxiosUtil';

export function getAll() {
  return AxiosUtil.get(`progress/`);
}
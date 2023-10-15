import { Response, get } from '@utils/axios';

export interface TimeSheet {
  wbs_id: number;
  sr_epic: string;
}

export function getTimeSheetMe(): Promise<Response<TimeSheet[]>> {
  return get<TimeSheet[]>('/example');
}

export interface IObjectKeys {
  [key: string]: string | number | undefined | null | boolean;
}

export interface WbsRecords extends IObjectKeys {
  id: number;
  wbs_code: string;
  wbs_name: string;
  sr_epic: string;
}

export interface SelectPeriods {
  label: string;
  startPeriod: string;
  endPeriod: string;
}

import { IdNameLevel } from "./general.models"

export class InsertControl {
    employeeId: number
    endDate: string
    name:string
    loggedHours: number
    userId: number
}

export interface InsertControlList{
    employeeIds: IdNameLevel[];
    startDate: string;
    endDate: string;
    page: number;
    pageSize: number;
    taskIds: number[];
    projectIds: number[];
    weekend: boolean;
  }
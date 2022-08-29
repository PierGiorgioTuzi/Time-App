import { IdName, IdNameLevel } from "./general.models"


export class StaffPrice {
    rowGuid: string
    employeeId: number
    employeeTypeId: number
    roleId: number
    year: number
    costItemTypeId: number
    costItemTypeName: string
    employeeName: string
    january: number
    february: number
    march: number
    april: number
    may: number
    june: number
    july: number
    august: number
    september: number
    october: number
    november: number
    december: number
    employeeIdentificationCode: number
    canModifyForWorker: boolean
    canModifyForThirdPart: boolean
  }

  export interface SearchIdNameStaffPrice{
    years: number[]
    employeeIds: IdNameLevel[],
    costItemTypeIds: IdName[]
  }

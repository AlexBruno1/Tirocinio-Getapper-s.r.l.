import { IUserFe } from "@/models/client/UserFe";
import { IJobFe } from "@/models/client/JobFe";

export interface UserState {
  me: IUserFe;
  current: IUserFe;
  list: IUserFe[];
}

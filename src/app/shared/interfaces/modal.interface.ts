import { Poll } from "./poll.interface";
import { Vote } from "./vote.interface";

export interface EmitionModalSettings {
    emittedObject?: Vote | Poll,
    isShowedModal: boolean
}
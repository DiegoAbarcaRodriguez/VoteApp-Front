
export interface Vote {
    title: string,
    img?: string,
    _id: number,
    description: string,
    amount?: number
}



export interface EmitionModalSettings {
    optionVote?: Vote,
    isShowedModal: boolean
}
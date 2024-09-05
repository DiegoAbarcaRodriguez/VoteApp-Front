export interface Poll {
    title: string,
    description: string,
    numberOfParticipants: number
    user_id?: string,
    _id?: string
}

export interface ResponsePollGet {
    pagesNumber: number[];
    total: number;
    polls: Poll[];
    next: string;
    previous: string;
    page:number;
}



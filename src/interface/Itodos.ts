export interface TodosCard {
    id: number;
    created_at: string;
    title: string;
    complete: boolean;
}

export interface TodosReq {
    created_at: string;
    title: string;
    complete: boolean;
}
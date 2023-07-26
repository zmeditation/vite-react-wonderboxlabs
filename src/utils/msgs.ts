export interface MoveMsg
{
    id: string,
    position: number[],
    rotation: number[] | string[],
}
export interface Clients
{
    [key: string]: MoveMsg
}
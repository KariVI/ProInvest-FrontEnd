export interface IInversor{
    id: number,
    names:string,
    lastFatherName: string,
    lastMotherName: string,
    rfc:string,
    bornDate: string,
    gradeAcademic: number,
    work:string,
    idUser:number,
    ipDirection: string

}

export interface ResponseInversor{
    id: number,
    lastFatherName: string,
    lastMotherName: string,
    cellphone: string,
    ipDirection: string
    bornDate: string,
    names: string,
    work: string
}
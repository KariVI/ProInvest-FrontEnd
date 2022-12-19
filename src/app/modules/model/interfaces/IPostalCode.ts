export interface postalCode{
    places:ICpData[]
}

export interface ICpData{
        colonia: string,
        cp: number,
        estado: string,
        idDatoSepomex: number,
        municipio: string
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentURL } from '../enviroments/enviroments';
import { Inversor } from '../modules/model/Inversor';
import { IResponse } from '../modules/model/interfaces/IResponse';
import { DirectionInversor } from '../modules/model/Direction';
import { InfoFinancial } from '../modules/model/InfoFinancial';


@Injectable({
    providedIn: 'root'
})

export class InvestmentService {

    private url = environmentURL.apiURL;
    constructor(private http: HttpClient) {
    }

    createInversor(newInversor: Inversor): Observable<IResponse> {
        let urlInversor = `${this.url}/inversionistaws/crearInversionista`;
        let payload = new HttpParams()
        .set('nombre', newInversor.names)
        .set('apellidoPaterno', newInversor.lastFatherName)
        .set('apellidoMaterno', newInversor.lastMotherName)
        .set('rfc', newInversor.rfc)
        .set("idUsuario", newInversor.idUser)
        .set('fechaNacimiento', newInversor.bornDate)
        .set('idGradoAcademico', newInversor.gradeAcademic)
        .set('profesion', newInversor.work)
        .set('celular', newInversor.cellphone)
        .set('direccionip', newInversor.ipDirection);
        return this.http.post<IResponse>(urlInversor, payload, {
            headers: new HttpHeaders({
                'Content-Type':  'application/x-www-form-urlencoded'            })
        });
    }

    createDirection(newDirection: DirectionInversor): Observable<IResponse> {  
        let urlDirection = `${this.url}/direccion/registrarDireccion`;
        let payload = new HttpParams()
        .set('calle', newDirection.street)
        .set('numeroExterior', newDirection.intStreet)
        .set('numeroInterior', newDirection.interior)
        .set('idDatoSepomex', Number.parseInt(newDirection.postalCode))
        .set("idInversionista", newDirection.idInversionista);
        return this.http.post<IResponse>(urlDirection, payload, {
            headers: new HttpHeaders({
                'Content-Type':  'application/x-www-form-urlencoded'            })
        });
    }

    createInfoFinancial(newInfo: InfoFinancial): Observable<IResponse> {

        let urlInfo = `${this.url}/informacionFinanciera/registrarInformacion`;
        let payload = new HttpParams()
        .set("idBanco", newInfo.bank)
        .set("clabe", newInfo.clabe)
        .set("cuenta", newInfo.accountBank)
        .set("idOrigenFondo", newInfo.savings);
        return this.http.post<IResponse>(urlInfo, payload, {
            headers: new HttpHeaders({
                'Content-Type':  'application/x-www-form-urlencoded'            })
        });
    }

    getInversor(rfc: string): Observable<number> {
        let urlUser= `${this.url}/inversionistaws/getByRfc/${rfc}`;
        return this.http.get<number>(urlUser);
    }
}

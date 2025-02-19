import { useEffect, useState } from "react"
import ZanrService from "../../services/ZanrService"
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function ZanroviPregled(){

    const[zanrovi, setZanrovi] = useState();
    const navigate = useNavigate();

    async function dohvatiZanrove(){
        const odgovor = await ZanrService.get()
        setZanrovi(odgovor)
    }

    // hooks (kuka) se izvodi prilikom dolaska na stranicu Zanrovi
    useEffect(()=>{
        dohvatiZanrove();
    },[])



    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeZanra(sifra);
    }

    async function brisanjeZanra(sifra) {
        const odgovor = await ZanrService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiZanrove();
    }


    return(
        <>
        <Link
        to={RouteNames.ZANR_NOVI}
        className="btn btn-success siroko"
        >Dodaj novi žanr</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Opis</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {zanrovi && zanrovi.map((zanr,index)=>(
                    <tr key={index}>
                        <td>
                            {zanr.naziv}
                        </td>
                        <td>
                            {zanr.opis}
                        </td>
                        <td>
                            <Button
                            onClick={()=>navigate(`/zanrovi/${zanr.id}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(zanr.id)}
                            >Obriši</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )


}
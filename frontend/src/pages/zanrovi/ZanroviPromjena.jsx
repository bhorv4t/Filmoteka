import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import ZanrService from "../../services/ZanrService";
import { useEffect, useState } from "react";


export default function ZanroviPromjena(){

    const navigate = useNavigate();
    const [zanr,setZanr] = useState({});
    const routeParams = useParams();

    async function dohvatiZanr(){
        const odgovor = await ZanrService.getBySifra(routeParams.id)
        setZanr(odgovor)
    }

    useEffect(()=>{
        dohvatiZanr();
    },[])

    async function promjena(zanr){
        const odgovor = await ZanrService.promjena(routeParams.id,zanr);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.ZANR_PREGLED)
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server pa standardnom načinu

        let podaci = new FormData(e.target);

        promjena(
            {
                naziv: podaci.get('naziv'),
                opis: podaci.get('opis')
            }
        );
    }

    return(
    <>
    Promjena zanra
    <Form onSubmit={odradiSubmit}>

        <Form.Group controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" required 
            defaultValue={zanr.naziv}/>
        </Form.Group>

        <Form.Group controlId="opis">
            <Form.Label>Ppis</Form.Label>
            <Form.Control type="text" name="opis" required 
            defaultValue={zanr.opis}/>
        </Form.Group>

        
        <hr/>

        <Row>
            <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                <Link
                to={RouteNames.ZANR_PREGLED}
                className="btn btn-danger siroko"
                >Odustani</Link>
            </Col>
            <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                <Button variant="success" type="submit" className="siroko">
                    Promjeni zanr
                </Button>
            </Col>
        </Row>


    </Form>




   
    </>
    )
}
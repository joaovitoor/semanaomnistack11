import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/Logo.png'

export default function Profile() {

    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    //dando um get nos itens enviados/setados em logon.
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data)
        })
    }, [ongId]);

    async function handleDeleteIncident(id){

        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            //Quando exluir um incident essa linha de código atualiza automaticamente esse delete.
            //Da um filtro no incidentes e seta(set) todos os que tem id diferente do id 
            //daquele que foi excluído. Isso no estado atualiza e a pagina de forma SPA atualiza.
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert("erro ao apagar incident");
        }
    }

    function handleLogout(){
        //è necessário dar um clear/limpar os dados do localStorage que são usados como autenticação
        //de login. Para que um novo login possa acontecer melhor.
        localStorage.clear();

        //redirecinando para a pagina home de login
        history.push('/')
    }

    return(
       <div className="profile-container">
           <header>
                <img src={logoImg} alt="BeTheHero" />
                <span>Bem, vindo {ongName}</span>


                <Link className="button" to="/incident/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>

           </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map( incident => (
                    
                    <li>
    
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
    
                        <strong>DESCRIÇÂO</strong>
                        <p>{incident.description}</p>
    
                        <strong>VALOR:</strong>
                        <p>
                        
                            {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(
                                incident.value
                            )}
                        </p>
                        
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#e02041" />
                        </button>
    
                    </li>
               
                ))}
            </ul>
            
       </div>
    )
}
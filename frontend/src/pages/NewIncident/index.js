import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/Logo.png';


export default function NewIncident(){

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [value, setValue] = useState();

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = ({
            title,
            description,
            value,
        })

        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        }catch (err){
            alert("erro ao cadastrar incident, tente novamente.");
        }
    }


    return (
        <div class="new-incident-container">
        <div class="content">
            <section>
                <img src={logoImg} alt="BeTheHero" />

                <h1>Cadastrar novo caso</h1>
                <p>
                    Descreva o caso detalhado para encontrar um novo herói para resolver isso
                </p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home
                </Link>     
            </section>
            
            <form onSubmit={handleNewIncident}>
                <input 
                    placeholder="Titulo do Caso" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                <textarea 
                    placeholder="Descrição" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                <input 
                    placeholder="valor em reais" 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />
                
                <button type="submit" className="button">Cadastrar</button>

            </form>
        </div>
    </div>
    )
}
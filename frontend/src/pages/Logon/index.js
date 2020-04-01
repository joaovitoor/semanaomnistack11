import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './style.css';
import { FiLogIn } from 'react-icons/fi';

import heroesImg from '../../assets/Pessoas.png';
import logoImg from '../../assets/Logo.png';

export default function Logon(){

    const [id, setId] = useState();

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });

            //setado itens em localstorage de logon, para ser usado depois por profile.
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            
            history.push('/profile');

        }catch(erro){
            alert("Erro ao efetuar Login");
        }

    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input value={id} onChange={e => setId(e.target.value)} type="text" placeholder="Sua ID"/>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}
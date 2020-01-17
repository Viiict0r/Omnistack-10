import React, {useState, useEffect} from 'react';

import "./styles.css";

function DevForm({ onSubmit }) {
    const [ username, setUsername ] = useState('');
    const [ techs, setTechs ] = useState('');
    const [ latitude, setLatitude ] = useState('');
    const [ longitude, setLongitude ] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
          }, err => {
            console.log(err);
          }, {
            timeout: 30000
          }
        );
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            username,
            techs,
            latitude,
            longitude
        });

        setUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="username">Usuário do Github</label>
                <input name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>

            <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" value={techs} onChange={e => setTechs(e.target.value)} />
            </div>
            
            <div className="input-group">
            <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input
                name="latitude"
                id="latitude"
                value={latitude}
                type="number"
                onChange={e => setLatitude(e.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input 
                name="longitude" 
                id="longitude" 
                value={longitude} 
                type="number"
                onChange={e => setLongitude(e.target.value)}
                />
            </div>
            </div>

            <button type="submit">Salvar</button>

        </form>
    )
}

export default DevForm;
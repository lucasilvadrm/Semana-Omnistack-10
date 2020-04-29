import React, { useState, useEffect } from 'react'

function DevForm({ onSubmit }) {
    const [github_username, setGithubusername] = useState('')
    const [techs, setTechs] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords

                setLatitude(latitude)
                setLongitude(longitude)
            },
            (err) => {
                console.log(err)
            },
            {
                timeout: 30000
            }
        )
    }, []) //disparar uma função sempre que uma informação alterar

    async function handleSubmit(e) {
        e.preventDefault()
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        })

        setGithubusername('')
        setTechs('')

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github-username">Usuário do GitHub</label>
                <input
                    name="github-username"
                    id="github-username"
                    required
                    value={github_username}
                    onChange={e => setGithubusername(e.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="Number"
                        name="latitude"
                        id="latitude"
                        required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">longitude</label>
                    <input
                        type="Number"
                        name="longitude"
                        id="longitude"
                        required
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                    />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm
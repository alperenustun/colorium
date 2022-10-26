import React from "react"

export default function Favorites(props) {
    const data = (JSON.parse(localStorage.getItem('colors')) || []);
    // data.map(item => {
    //     item.map(color => {
    //         console.log(color.hex.value)
    //     })
    // })
    return (
        <div style={{display: props.shown}}>
            <h1>Favorites</h1>
            {
                data.map(item =>{
                    return(
                        <div className="test-container">
                            {
                                item.map(color =>{
                                    return (
                                        <div style={{background: color.hex.value}} className="test-container-inner">
                                            <p>{color.name.value}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
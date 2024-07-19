import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div style={{height:'70vh', display:'flex',justifyContent:'center',alignItems:'center'}}>
            <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#1C64E3"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}


export default Loader

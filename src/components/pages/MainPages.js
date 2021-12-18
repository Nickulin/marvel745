import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearch from '../charSearch/CharSearch'
import ErorrBoundary from "../errorBoundary/ErorrBoundary";
import { useState } from "react";

import React from "react";
import {Helmet} from "react-helmet";

import decoration from '../../resources/img/vision.png';

const MainPages = () => {

    const [selectedChar, setChar] = useState(null);
    
    const onCharSelected = (id) =>{
            setChar(id)        
    }
    
    return(
        <>
        <Helmet>
            <meta
                name="description"
                content="Marvel information portal"
                />
            <title>Marvel information</title>
        </Helmet>

        <ErorrBoundary>
            <RandomChar/> 
        </ErorrBoundary>
                                 
            <div className="char__content">
                <ErorrBoundary>
                    <CharList onCharSelected={onCharSelected}/> 
                </ErorrBoundary>
                    
                <div>
                    <ErorrBoundary>
                        <CharInfo charId = {selectedChar}/> 
                    </ErorrBoundary>
                    <ErorrBoundary>
                        <CharSearch/> 
                    </ErorrBoundary>
                </div>                
                    
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
      
    )
}

export default MainPages;
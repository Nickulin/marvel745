import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErorrBoundary from "../errorBoundary/ErorrBoundary";
import { useState } from "react";

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [selectedChar, setChar] = useState(null);
    

    const onCharSelected = (id) =>{
            setChar(id)        
    }
    
    return (
        <div className="app">
            <AppHeader/>
            <main><ErorrBoundary>
                <RandomChar/>
            </ErorrBoundary>                    
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected}/>                        
                    <ErorrBoundary>
                    <CharInfo charId = {selectedChar}/>   {/*state значит передаем в  CharInfo*/}
                    </ErorrBoundary>
                    
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
    
    
}

export default App;
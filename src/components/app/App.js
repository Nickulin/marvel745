import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErorrBoundary from "../errorBoundary/ErorrBoundary";
import { Component } from "react";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state ={
        selectedChar: null
    }

    onCharSelected = (id) =>{
        this.setState({
            selectedChar: id
        })
    }
    render(){
        return (
            <div className="app">
                <AppHeader/>
                <main><ErorrBoundary>
                    <RandomChar/>
                </ErorrBoundary>                    
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected}/>                        
                        <ErorrBoundary>
                        <CharInfo charId = {this.state.selectedChar}/>   {/*state значит передаем в  CharInfo*/}
                        </ErorrBoundary>
                      
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
    
}

export default App;
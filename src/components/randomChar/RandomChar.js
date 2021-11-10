import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class RandomChar extends Component {
    
    state = {
        char: {},
        loading: true, //хз для чего ведь то что ниже специально вынесли из общего массива
        error: false
        // name : null,
        // description: null,
        // thumbnail: null,
        // homepage: null,
        // wiki: null
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar()
    }

    onChatLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        }); 
    }

    onChatLoading = () => {
        this.setState({
            loading: true
        }); 
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        }); 
    }

    updateChar = () =>{
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onChatLoading();
        this.marvelService
            // .getAllCharacters()                  //для всех
            // .then(res => console.log(res))
            .getCharacter(id)
            // .then(res => {
            //     this.setState(res)
            // })
            .then(this.onChatLoaded)
            .catch(this.onError)
    }
    
    render(){
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const loadingMessage = loading ? <Spinner/> : null;
        const content = !(error || loading) ? <View char={char} /> : null 

        return (
            <div className="randomchar">
                {errorMessage}
                {loadingMessage}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }   
}

const View = ({char}) =>{

    const  {name, description, thumbnail, homepage, wiki} = char;
    const active = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    const clazz = active ? 'randomchar__img' : 'randomchar__img-c' 
    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className= {clazz}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
   
}

export default RandomChar;
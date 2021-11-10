import './charInfo.scss';
// import thor from '../../resources/img/thor.jpeg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar();                      
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if(!charId){
            return; // останавливает выполнение,  начальное значение
        }

        this.onChatLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onChatLoaded)
            .catch(this.onError)

    }   

    componentDidCatch(err, info){
        console.log(err, info)
        this.setState({error: true})
    }

    onChatLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        }); //char: char}
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
        }); //char: char}
    }

    render(){
        const {char, loading, error} = this.state;

        const sceleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const loadingMessage = loading ? <Spinner/> : null;
        const content = !(error || loading || !char) ? <View char={char} /> : null 

        return (
            <div className="char__info">
                {sceleton}
                {errorMessage}
                {loadingMessage}
                {content}
            </div>
        )
    }
    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const active = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    const clazz = active ? 'randomchar__img' : 'randomchar__img-c' 
    
    return(
        <> <div className="char__basics">
                <img src={thumbnail} alt="abyss"className= {clazz}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">{description}</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'not information'}
                {
                    comics.slice(0,10).map((item, i)=>{
                        return(
                            <li key={i}
                                    className="char__comics-item">
                                {item.name}
                            </li>
                        )                        
                    })
                }               
                
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.string // не будет проблемм
}

export default CharInfo;
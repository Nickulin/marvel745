import './charList.scss';
import PropTypes from 'prop-types';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
    state = {
        list: [],
        loading: true,
        offset: 210,
        newItemLoading: true,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.onRequest();                      
    }

    onRequest = (offset) =>{
        this.onChatLoading();
        this.marvelService
            .getAllCharacters(offset)   
            .then(this.onCharListLoaded) 
            .catch(this.onError)
    }

    onCharListLoaded = (newList) => { //newList то что получим .then(this.onCharListLoaded) 
        let ended = false;
        if(newList.length < 9){
            ended = true;
        }
        this.setState(({list, offset}) =>({
            list: [...list, ...newList],
            loading: false,
            offset: offset + 9,
            newItemLoading: false,
            charEnded: ended
        }))
    }
    
    onChatLoading = () => {
        this.setState({
            loading: true,
            newItemLoading: true
        }); 
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    setRefItem = [];

    setRef = (ref) =>{
        this.setRefItem.push(ref);
    }

    onFocusItem = (id) => {
        this.setRefItem.forEach(item => item.classList.remove('char__item_selected'));
        this.setRefItem[id].classList.add('char__item_selected');
        this.setRefItem[id].focus();
    }

    charList = (arr) =>{        
        const buttons = arr.map((item, i)=> {
            const active = item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            const clazz = active ? 'randomchar__img' : 'randomchar__img-c' 
            return(
                <li className="char__item" 
                    key={item.id}
                    tabIndex={0}
                    ref={this.setRef}
                    onClick={()=> {this.props.onCharSelected(item.id);
                                    this.onClick = this.onFocusItem(i);}}> {/*передача данных */}                    
                    <img src={item.thumbnail} alt={item.name} className= {clazz}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return(            
            <ul className="char__grid">
                {buttons}
            </ul>
        )        
    }

    render(){
        const {list, loading, offset, newItemLoading, charEnded} = this.state;
        const loadingMessage = loading ? <Spinner/> : null;
        const items = this.charList(list);
        const content = items ;
        return (
            <div className="char__list">
                {loadingMessage}
                {content}
                <button className="button button__main button__long"
                    onClick= {()=> this.onRequest(offset)}
                    disabled={newItemLoading}
                    style = {{display: charEnded ? 'none': 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }  
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;



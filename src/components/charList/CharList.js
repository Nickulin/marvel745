import './charList.scss';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import CharSearch from '../charSearch/CharSearch';

const CharList = (props) => {
    
        const [list, setList] = useState([]);
        const [offset, setOffset] = useState(210);
        const [newItemLoading, setNewItemLoading] = useState(true);
        const [charEnded, setCharEnded] = useState(false) ;   

    const {loading, error, getAllCharacters} = useMarvelService();
    
    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        
        
        getAllCharacters(offset)   
            .then(onCharListLoaded) 
    }

    const onCharListLoaded = (newList) => { //newList то что получим .then(this.onCharListLoaded) 
        let ended = false;
        if(newList.length < 9){
            ended = true;
        }
        setList(list => [...list, ...newList]);
        setOffset(offset => offset + 9);
        setNewItemLoading(newItemLoading => false);
        setCharEnded(charEnded => ended);
    }   

    const setRefItem = useRef([]);

    const onFocusItem = (id) => {
        setRefItem.current.forEach(item => item.classList.remove('char__item_selected'));
        setRefItem.current[id].classList.add('char__item_selected');
        setRefItem.current[id].focus();
    }

    function charList(arr) {        
        const buttons = arr.map((item, i)=> {
            const active = item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            const clazz = active ? 'randomchar__img' : 'randomchar__img-c' 
            return(
                <li className="char__item" 
                    key={item.id}
                    tabIndex={0}
                    ref={el => setRefItem.current[i] = el}
                    onClick={()=> {props.onCharSelected(item.id);
                                   onFocusItem(i);}}> {/*передача данных */}                    
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

        const spinner= loading && !newItemLoading ? <Spinner/> : null;
        const items = charList(list);
        return (
            <div className="char__list">            
                {error}
                {spinner}
                {items}
                <button className="button button__main button__long"
                    onClick= {()=> onRequest(offset)}
                    disabled={newItemLoading}
                    style = {{display: charEnded ? 'none': 'block'}}>
                    <div className="inner">load more</div>
                </button>
                {CharSearch}
            </div>
        )
     
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;



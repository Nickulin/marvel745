import './comicsList.scss';
import useMarvelService from "../../services/MarvelService";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';

const ComicsList = (props) => {

    const {loading, error , getAllComics} = useMarvelService();

    const [list, setList] = useState([]);
    const [offset, setOffset] = useState(1000);
    const [newItemLoading, setnewItemLoading] = useState(true)

    useEffect(()=>{
        onRequest(offset, true);
    },[])

    const onRequest =(offset, initial)=>{
        initial? setnewItemLoading(false): setnewItemLoading(true);

        getAllComics(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded =(newList)=>{
        setList([...list, ...newList]);
        setOffset(offset+8);
        setnewItemLoading(false);
    }

    function comicsList(arr) {
        const comics = arr.map((items, i) =>{
            return (
                <>
                    <li className="comics__item"
                        key={i}>
                        <Link to={`/comics/${items.id}`}>
                            <img src={items.thumbnail} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{items.title}</div>
                        <div className="comics__item-price">{items.price}$</div>
                        </Link>
                    </li> 
                </>               
            )  
        })
        return(
            <ul className="comics__grid">
                {comics}
            </ul>
        )
    }  
    const spinner= loading && !newItemLoading ? <Spinner/> : null;
    const viewComics = comicsList(list);
    return(
        <div className="comics__list">
            {spinner}
            {error}
            {viewComics}
            <button className="button button__main button__long"
                onClick={()=> onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )  
}

export default ComicsList;
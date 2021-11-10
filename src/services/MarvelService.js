class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
    _apikey = 'apikey=359205cdaf943900f04347fc721a8391';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch (url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}?limit=9&offset=${offset}&${this._apikey}`);
        return res.data.results.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        // return this.getResource(`${this._apiBase}/${id}?${this._apikey}`); // было, возврат актуален для 1-го персонажа, но когда их много необходимо оптимизировать
        const res = await this.getResource(`${this._apiBase}/${id}?${this._apikey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name :  char.name,
            description:  char.description ? `${char.description.slice(0, 100)} + '...' `: 'not info', 
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:  char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;
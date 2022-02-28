import React, {useEffect, useState} from 'react'
import './Favorites.scss'
import Localstorage from "../../services/Localstorage"
import Helpers from "../../services/Helpers"

const Favorites = () => {
    const helpers = new Helpers()
    const localstorage = new Localstorage();
    const [favArticles, setFavArticles] = useState(localstorage.get("article") ?? []);

    useEffect(() => {
        setFavArticles(localstorage.get("article") ?? [])
    }, []);

    const removeFromFavorites = (article) => {
        if (favArticles){
            const data = favArticles.filter(element => element.story_id !== article.story_id)
            setFavArticles(data)
            localstorage.set('article', data)
        }
        return []
    }

    return (

        <section className="data-fav">
            {favArticles.map((article) => {
                return(
                    <article key={article.objectID}>
                        <a target="_blank" href={article.story_url}>
                            <section>
                                <img src={"./assets/iconmonstr-time-2.png"} className="clock"/><span>{helpers.tranformDate(article.created_at)} hours ago by{article.author}</span>
                                <p>{article.story_title}</p>
                            </section>
                        </a>
                        <aside><span onClick={() => {
                            removeFromFavorites(article)
                        }}><img src={"./assets/iconmonstr-favorite-3.png"}/></span></aside>

                    </article>
                )
            })}
        </section>
    );
}

export default Favorites
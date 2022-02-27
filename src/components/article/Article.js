import React, {useEffect, useState} from "react";
import './Article.scss';
import moment from 'moment';
import Localstorage from "../../services/Localstorage"

function Article(article) {
    const localstorage = new Localstorage();
    const [image, setimage] = useState('./assets/iconmonstr-favorite-2.png')

    useEffect(() => {
        setImageFilter()
    }, []);

    const setImageFilter = () => {
        const getDataFromLocalStorage = localstorage.get('article')
        getDataFromLocalStorage.filter(element => {
            if (element.objectID === article.article.objectID){
                setimage('./assets/iconmonstr-favorite-3.png')
            }
        })
    }

    const tranformDate = (date) =>{
        const newDate = moment(date).format('YYYY-MM-DD h:mm:ss a')
        const splitDate = newDate.split(':')
        const getLastNumber =  splitDate[0]
        return getLastNumber.charAt(getLastNumber.length - 1)
    }

    const removeDuplicates = (originalArray) => {
        return Object.values(originalArray.reduce((acc,cur)=>Object.assign(acc,{[cur.objectID]:cur}),{}))
    }
    
    const setImageFavorite = () => {
      setimage('./assets/iconmonstr-favorite-3.png')
    }

    const setFavorite = (article) => {
        let arrayData = []
        let getData = localstorage.get('article')
        if (getData){
            arrayData.push(...getData)
            arrayData.push(article)
            const removeDuplicate = removeDuplicates(arrayData)
            setImageFavorite()
            return localstorage.set('article', removeDuplicate)
        }
        localstorage.set('article', ([article]))
    }

    return (
        <article>
            <a target="_blank" href={article.article.story_url}>
                <section>
                    <img src={"./assets/iconmonstr-time-2.png"} className="clock"/><span> {tranformDate(article.article.created_at)} hours ago by {article.article.author}</span>
                    <p>{article.article.story_title}</p>
                </section>
            </a>
            <aside><span onClick={() => {
                setFavorite(article.article)
            }}><img src={image}/></span></aside>
        </article>
    );
}
export default Article;
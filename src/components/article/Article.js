import React, {useState} from "react";
import './Article.scss';
import moment from 'moment';

function Article(article) {

    const [image, setImage] = useState('');

    const tranformDate = (date) =>{
        const newDate = moment(date).format('YYYY-MM-DD h:mm:ss a')
        const splitDate = newDate.split(':')
        const getLastNumber =  splitDate[0]
        return getLastNumber.charAt(getLastNumber.length - 1)
    }

    const getDataFromLocalStorage = () => {
        const validate = localStorage.getItem('article')
        if (validate){
            const getData = JSON.parse(validate)
            return getData
        }
        return null
    }

    const removeDuplicates = (originalArray) => {
        return Object.values(originalArray.reduce((acc,cur)=>Object.assign(acc,{[cur.story_id]:cur}),{}))
    }

    const setFavorite = (article) => {
        let arrayData = []
        let getData = getDataFromLocalStorage()
        if (getData){
            arrayData.push(...getData)
            arrayData.push(article)
            const removeDuplicate = removeDuplicates(arrayData)
            return localStorage.setItem('article', JSON.stringify(removeDuplicate))
        }
        localStorage.setItem('article', JSON.stringify([article]))
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
            }}><img src={'./assets/iconmonstr-favorite-2.png'}/></span></aside>
        </article>
    );
}
export default Article;
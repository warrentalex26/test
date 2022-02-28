import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header";
import Navigation from "../../components/navigation/Navigation";
import Search from "../../components/search/Search";
import Pagination from "../../components/pagination/Pagination";
import Article from "../../components/article/Article";
import Api from "../../services/Api"
import './LandingPage.scss'
import Favorites from "../../components/favorites/Favorites";
import Localstorage from "../../services/Localstorage"

function LandingPage(props) {

    const localstorage = new Localstorage();
    const api = new Api();

    const [articles, setArticles] = useState([]);
    const [articleTotal, setArticlesTotal] = useState(0);
    const [valueSelect, setValueSelect] = useState(localstorage.get("search") ?? 'angular')
    const [tabSelect, setTabSelect] = useState('all')


    const handleSelectChange = (value = '') => {
        setValueSelect(value)
        fetchData(value, 0);
    }

    useEffect(() => {
        fetchData(valueSelect, 0);
    }, []);


    const fetchData = async (query = '', page = 0) => {
        try {
            const response = await api.getData(query, page)
            const data = await response.json()
            setArticlesTotal(data.nbPages ? data.nbPages : 0 )
            return (data.hits) ? filterData(data.hits) : null
        }catch (error){
            return alert(`Ups, we have a error => ${error}`)
        }
    }

    const TabSelected = (tab) =>{
        setTabSelect(tab)
    }

    const changePageToData = (pageNumber) =>{
        fetchData(valueSelect, pageNumber)
    }

    const removeDatawithoutAttributes = (data) => {
        const newData = data.filter( (element) => element.story_title || element.story_url !== null )
        return newData
    }

    const filterData = (data = []) => {
        const removeData = removeDatawithoutAttributes(data)
        console.log(removeData)
        if (removeData.length){
            const newData = removeData.map(data => {
                return {
                    author: data.author,
                    story_title: data.story_title,
                    story_url: data.story_url,
                    created_at: data.created_at,
                    story_id: data.story_id,
                    objectID: data.objectID,
                }
            });
            return setArticles(newData)
        }
        return []
    }

    return (
        <section id={`landing-hacker-news`}>

            {/*Header*/}
            <Header/>

            {/*Main content*/}
            <main>

                {/*Navigation*/}
                <section className={`tab-cnt`}>
                    <Navigation onChangeTab={(tab)=>{
                        TabSelected(tab)
                    }}/>
                </section>

                {
                    tabSelect === 'all'
                        ?(
                            <div>
                                {/*Search*/}
                                <section className={`select-cnt`}>
                                    <Search onChange={handleSelectChange}/>
                                </section>

                                {/*Articles*/}
                                <section className={`data-cnt`}>
                                    {
                                        articles.map((article, i) => {
                                            return <Article key={i} article={article}/>
                                        })
                                    }
                                </section>

                                <Pagination _totalItems={articleTotal} _onChangePage={(page)=>{
                                    changePageToData(page)
                                }}/>
                            </div>
                        )
                        :
                            <Favorites/>
                }
            </main>
        </section>
    );
}

export default LandingPage;
import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header";
import Navigation from "../../components/navigation/Navigation";
import Search from "../../components/search/Search";
import Pagination from "../../components/pagination/Pagination";
import Article from "../../components/article/Article";
import Api from "../../services/Api"
import './LandingPage.scss'
import Favorites from "../../components/favorites/Favorites";

function LandingPage(props) {

    const [articles, setArticles] = useState([]);
    const [articleTotal, setArticlesTotal] = useState(0);
    const [valueSelect, setValueSelect] = useState('angular')
    const [tabSelect, setTabSelect] = useState('all')
    const api = new Api();

    const handleSelectChange = (value = '') => {
        setValueSelect(value)
        fetchData(value, 0);
    }

    useEffect(() => {
        fetchData(valueSelect, 0);
    }, []);


    const fetchData = async (query = '', page = 0) => {
        const response = await api.getData(query, page)
        const data = await response.json()

            setArticlesTotal(data.nbPages ? data.nbPages : 0 )
        return (data.hits) ? filterData(data.hits) : null
    }

    const TabSelected = (tab) =>{
        setTabSelect(tab)
    }

    const changePageToData = (pageNumber) =>{
        fetchData(valueSelect, pageNumber)
    }

    const filterData = (data) => {
        if (data.length){
            const newData = data.map(data => {
                return {
                    author: data.author,
                    story_title: data.story_title,
                    story_url: data.story_url,
                    created_at: data.created_at,
                    story_id: data.story_id,
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
                                            return <Article article={article}/>
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
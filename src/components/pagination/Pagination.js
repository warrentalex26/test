import React, {useEffect, useState} from "react";
import './Pagination.scss';

function Pagination({_currentPage = 1, _totalItems, _onChangePage = () => {}}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalitems, setTotalitems] = useState(0);
    const [bulk, setBulk] = useState(0);

    useEffect(() => {
        setCurrentPage(_currentPage)

        return () => {
        };
    }, [_currentPage]);

    useEffect(() => {
        setTotalitems(_totalItems);
        return () => {
        };
    }, [_totalItems]);

    const checkChunks = () => {
        if (_totalItems) {
            const nextBulk = currentPage + 5;
            const isLimitExceded = nextBulk > _totalItems;
            setBulk(isLimitExceded ? (_totalItems - currentPage) : 5);
        }
    }

    useEffect(() => {
        setCurrentPage(_currentPage);

        return () => {
        };
    }, [_currentPage]);

    const onChangePage = (page) => {
        setCurrentPage(page);
        _onChangePage(page);
    }

    const nextPage = () => {
        if (currentPage < _totalItems) {
            const page = currentPage + 1;
            checkChunks();
            setCurrentPage(page);
            _onChangePage(page);
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            const page = currentPage - 1;
            checkChunks();
            setCurrentPage(page);
            _onChangePage(page);
        }
    }

    return (
        <nav className={`pagination-cnt`}>
            <ul className="pagination">
                <li><a onClick={() => {
                    setCurrentPage(1)
                    _onChangePage(1);
                }} rel="first">First</a></li>
                <li><a onClick={() => {
                    prevPage()
                }} rel="prev">Previous</a></li>
                {
                    [...Array(bulk || 6)].map((e, i) => {
                        return <li>
                            <a
                                className={`${currentPage === currentPage + i ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onChangePage(currentPage + i)
                                }} href="#">{currentPage + i}</a>
                        </li>
                    })
                }
                <li><a onClick={() => {
                    nextPage()
                }} rel="next">Next</a></li>
                <li><a onClick={() => {
                    setCurrentPage(_totalItems)
                    _onChangePage(_totalItems);
                }} rel="last">Last</a></li>
            </ul>
        </nav>
    );
}

export default Pagination;
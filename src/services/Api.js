import React, {Component} from 'react'
import config from '../config'

export default class Api extends Component {

    validateQuery = (query) => {
        return (query) ? true : false
    }

    getPath = (query, page) => {
        if(this.validateQuery(query)){
            return `${config.endpoint.basepath}search_by_date?query=${query}&page=${page}`
        }
        return ''
    }

    getData = async (query, page) => {
        const path = this.getPath(query, page)
        if (path) {
            const response = await fetch(path)
            const data = await response
            return data
        }
        return []
    }
}
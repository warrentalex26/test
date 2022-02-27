import React, {Component} from 'react'

export default class Localstorage extends Component {

    get = (name) => {
        const validate = localStorage.getItem(name)
        if (validate){
            const getData = JSON.parse(validate)
            return getData
        }
        return null
    }

    set = (name, data) =>{
        return localStorage.setItem(name, JSON.stringify(data))
    }

}
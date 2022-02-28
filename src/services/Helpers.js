import React, {Component} from 'react'
import moment from "moment";

export default class Helpers extends Component {

    tranformDate = (date) => {
        const newDate = moment(date).format('YYYY-MM-DD h:mm:ss a')
        const splitDate = newDate.split(':')
        const getLastNumber =  splitDate[0]
        return getLastNumber.charAt(getLastNumber.length - 1)
    }

}
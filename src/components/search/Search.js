import React, {useState} from "react";
import './Search.scss';

export const defaultItem = 'angular';

function Navigation(props) {

    const [selected, setSelected] = useState(defaultItem);

    const options = [
        {
            label: 'Angular',
            value: 'angular',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
        },
        {
            label: 'Reactjs',
            value: 'reactjs',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
        },
        {
            label: 'Vue',
            value: 'vuejs',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
        },
    ]

    return (
        <div className="search-cnt">
            <select id="frameworks" onChange={(e)=>{
                const val = e.target.value;
                setSelected(val)
                props.onChange(val)
            }} value={selected}>
                {options.map((option, index) => {
                    return (

                        <option key={`select-opt-${index}`}
                                value={option.value}>{option.label}
                        </option>

                    )
                })}
            </select>
        </div>
    );
}

export default Navigation;
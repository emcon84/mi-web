import React from 'react'
import { dataPersonalDescripcion } from '../../../data/data'
import { CardComponent } from '../../Card/CardComponent'
import { text__h2_teal_bold } from '../js/HomeClassTW'

export const PersonalDescription = () => {
    return (
        <div className="col-span-2">
            <CardComponent>
                {dataPersonalDescripcion.map((description) =>
                    <div key={description}>
                        <h2 className={text__h2_teal_bold}>{description.title}</h2>
                        <hr />
                        <p className='text-white py-3'>{description.text}<br /><br />
                            <span className='font-bold'>{description.text_finally}</span>
                        </p>
                    </div>
                )}
            </CardComponent>
        </div>
    )
}

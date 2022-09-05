import React from 'react'
import { dataContact } from '../../../data/data'
import { CardComponent } from '../../Card/CardComponent'
import { flex__center_teal, text__h2_teal_bold, text__white_bold } from '../js/HomeClassTW'

export const Contact = () => {
    return (
        <CardComponent>
            <h2 className={text__h2_teal_bold}>Contact</h2>
            <hr />
            <ul className='py-3'>
                {dataContact.map((contact) =>
                    <li className={text__white_bold} key={contact.name}>
                        <a href={contact.href} className={flex__center_teal}>
                            {contact.icon}{contact.name}
                        </a>
                    </li>
                )}

            </ul>
        </CardComponent>
    )
}

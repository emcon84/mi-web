import React from 'react'
import { dataSocialNetwork } from '../../../data/data'
import { CardComponent } from '../../Card/CardComponent'
import { flex__col_center, grid__col_5, text__h2_teal_bold } from '../js/HomeClassTW'

export const SocialNerwork = () => {
    return (
        <CardComponent>
            <h2 className={text__h2_teal_bold}>Social Network</h2>
            <hr />
            <div className={grid__col_5}>
                {dataSocialNetwork.map((social) =>
                    <div className={flex__col_center} key={social.name}>
                        <a href={social.href}>
                            {social.icon}
                            <p className='text-white'>
                                {social.name}
                            </p>
                        </a>
                    </div>
                )}
            </div>
        </CardComponent>
    )
}

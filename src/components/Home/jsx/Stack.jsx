import React from 'react'
import { dataStack } from '../../../data/data'
import { CardComponent } from '../../Card/CardComponent'
import { flex__col_center, grid__col_5, text__h2_teal } from '../js/HomeClassTW'

export const Stack = () => {
    return (
        <CardComponent>
            <h2 className={text__h2_teal}>Stack</h2>
            <hr />
            <div className={grid__col_5}>
                {dataStack.map(stack =>
                    <div className={flex__col_center} key={stack.id}>
                        {stack.icon}
                        <p className='text-white'>
                            {stack.name}
                        </p>
                    </div>
                )}
            </div>
        </CardComponent>
    )
}

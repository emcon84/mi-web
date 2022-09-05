
import './CardStyles.css'

export const CardComponent = ({ children }) => {
    return (
        <div className='card__dark shadow-lg'>
            {children}
        </div>
    )
}

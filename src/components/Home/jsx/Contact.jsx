import React from 'react'
import { BsFillTelephoneForwardFill, BsTelegram } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { IoLogoWhatsapp } from 'react-icons/io'
import { CardComponent } from '../../Card/CardComponent'
import { flex__center_teal, text__h2_teal_bold, text__white_bold } from '../js/HomeClassTW'

export const Contact = () => {
    return (
        <div className='h-screen text-align-center flex flex-col items-center justify-center bg-slate-800 text-white'>
            <h1 className='text-4xl'>Contacto</h1>
            <div className='border-2 border-white rounded-lg p-4 mt-10'>       
                <ul className='py-3 flex'>
                    <li><a href="mailto:emcon84@gmail.com">
            <MdEmail className='text-white mr-10' size={32} />
            
        </a></li>
                    <li><IoLogoWhatsapp className='text-white mr-3' size={38} /></li>                
                </ul>
            </div>

        </div>
    )
}



//import class from Tailwind
import {
    container,
    grid__col_3,
    text__h2_teal_bold,
    title__h1
} from '../js/HomeClassTW'

//components from Home
import { Stack } from './Stack'
import { Contact } from './Contact'
import { SocialNerwork } from './SocialNerwork'
import { PersonalDescription } from './PersonalDescription'

import '../css/HomeStyles.css'
import { JobsAndPractice } from './JobsAndPractice'


export const HomeComponent = () => {
    return (
        <div className={container}>
            <div className='nav__home'>
                <h1 className={title__h1}>Emiliano Conti</h1>
                <p className='text-slate-300'>Frontend Developer</p>
            </div>
            <div className={grid__col_3}>

                <Contact />
                <Stack />
                <SocialNerwork />

            </div>
            {/* <div className='pt-3'>
                <PersonalDescription />
            </div> */}
            <div className='p-5'>
                <h2 className={text__h2_teal_bold}>Jobs and Practice </h2>
                <hr />
            </div>
            <div className={grid__col_3}>
                <JobsAndPractice />
            </div>
        </div>
    )
}

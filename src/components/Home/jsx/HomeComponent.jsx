//import class from Tailwind
import {
    button_primary,
    container,
    grid__col_3,
    text__h2_teal_bold,
    text__h2_white_bold,
    title__h1
} from '../js/HomeClassTW'


//components from Home
import { Stack } from './Stack'
import { Contact } from './Contact'
import { SocialNerwork } from './SocialNerwork'
// import { PersonalDescription } from './PersonalDescription'

import '../css/HomeStyles.css'
import { JobsAndPractice } from './JobsAndPractice'
import { CardComponent } from '../../Card/CardComponent'

import OliverPets from '../../../assets/img/OliverPets.png'
import OliverPetsSplash from '../../../assets/img/splash.jpg'
import OliverPetsHome from '../../../assets/img/Home.jpg'
import OliverPetsBrands from '../../../assets/img/brands.jpg'
import OliverPetsProductList from '../../../assets/img/productList.jpg'
import OliverPetsProductPage from '../../../assets/img/productPage.jpg'
import Curriculum from '../../../assets/doc/Curriculum.pdf'


export const HomeComponent = () => {

    function handleClick() {
        window.open(Curriculum, "_blank");
    }

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

            <div className='p-5'>
                <h2 className={text__h2_teal_bold}>Jobs and Practice </h2>
                <hr />
            </div>
            <div>
                <CardComponent>
                    <h2 className={text__h2_white_bold}>Oliver Pets - Ecommerce</h2>
                    <div className="grid grid-cols gap-8 md:grid-cols-2">
                        <div className="col">
                            <img src={OliverPets} alt="" />
                        </div>
                        <div className="col">
                            <p className="text-white">Ecommerce system for a startup company from Argentina. In this project my job was to integrate analytics functionalities, such as Clevertap, google analytics. Make the mobile model based on a custom figma design. Working with React Native. Make the layout of the web with React for both its mobile and desktop design. On the web, StyledComponts is used as a CSS library. It is still in Development, and it is my current job where I have been working for 8 months.</p>
                            <br />
                            <div className="grid grid-cols-6 gap-4">

                                <div className="col">
                                    <a href="#my-modal-1">
                                        <img src={OliverPetsSplash} alt="" />
                                    </a>
                                </div>
                                <div className="col">
                                    <a href="#my-modal-2">
                                        <img src={OliverPetsHome} alt="" />
                                    </a>
                                </div>
                                <div className="col">
                                    <a href="#my-modal-3">
                                        <img src={OliverPetsBrands} alt="" />
                                    </a>
                                </div>
                                <div className="col">
                                    <a href="#my-modal-4">
                                        <img src={OliverPetsProductList} alt="" />
                                    </a>
                                </div>
                                <div className="col">
                                    <a href="#my-modal-5">
                                        <img src={OliverPetsProductPage} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardComponent>
                <div className="modal" id="my-modal-1">
                    <div className="modal-box">
                        <img src={OliverPetsSplash} alt="" />
                        <div className="modal-action">
                            <a href="#" className="btn">Close!</a>
                        </div>
                    </div>
                </div>
                <div className="modal" id="my-modal-2">
                    <div className="modal-box">
                        <img src={OliverPetsHome} alt="" />
                        <div className="modal-action">
                            <a href="#" className="btn">Close!</a>
                        </div>
                    </div>
                </div>
                <div className="modal" id="my-modal-3">
                    <div className="modal-box">
                        <img src={OliverPetsBrands} alt="" />
                        <div className="modal-action">
                            <a href="#" className="btn">Close!</a>
                        </div>
                    </div>
                </div>
                <div className="modal" id="my-modal-4">
                    <div className="modal-box">
                        <img src={OliverPetsProductList} alt="" />
                        <div className="modal-action">
                            <a href="#" className="btn">Close!</a>
                        </div>
                    </div>
                </div>
                <div className="modal" id="my-modal-5">
                    <div className="modal-box">
                        <img src={OliverPetsProductPage} alt="" />
                        <div className="modal-action">
                            <a href="#" className="btn">Close!</a>
                        </div>
                    </div>
                </div>


            </div>
            <div className={grid__col_3}>
                <JobsAndPractice />
            </div>
            <div className='py-10'>
                <CardComponent>
                    <div className="grid md:grid-cols-3 py-5">
                        <div className="col"></div>
                        <div className="col">
                            <div className='w-100'>
                                <a href='#'>
                                    <button
                                        onClick={handleClick}
                                        type="button"
                                        className={button_primary}
                                    >
                                        Download CV
                                    </button>
                                </a>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                </CardComponent>

            </div>
        </div>
    )
}

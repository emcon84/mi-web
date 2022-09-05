import React from 'react'
import { jobsAndPractice } from '../../../data/data'
import { CardComponent } from '../../Card/CardComponent'
import {
    button_primary,
    collapse_content,
    collapse_title,
    text__h2_white_bold
} from '../js/HomeClassTW'

export const JobsAndPractice = () => {
    return (
        <>
            {jobsAndPractice.map((job) =>
                <div className="col pb-5" key={job}>
                    <CardComponent>
                        <h2 className={text__h2_white_bold}>{job.title}</h2>
                        <div className='pb-5'>
                            <a href={job.href}>
                                <img
                                    className='rounded-lg'
                                    src={job.img}
                                    alt="Emiliano Conti Gift App example"

                                />
                            </a>
                        </div>
                        <hr />
                        {job.listTech.map((list) =>
                            <ul className='py-3' key={list}>
                                <li className='text-teal-500'>Technology: {list.technology} </li>
                                <li className='text-teal-500'>Deploy: {list.deploy}</li>
                            </ul>
                        )}
                        <div className="grid grid-cols-2 gap-4 pb-5">
                            {job.listTech.map((list) =>
                                <>
                                    <div className='w-100' key={list}>
                                        <a href={list.link[0]}>
                                            <button

                                                type="button"
                                                className={button_primary}
                                            >

                                                {list.link[1]}
                                            </button>
                                        </a>
                                    </div>
                                    <div className='w-100' key={list}>
                                        <a href={list.code[0]}>
                                            <button

                                                type="button"
                                                className={button_primary}
                                            >
                                                {list.code[1]}
                                            </button>
                                        </a>
                                    </div>
                                </>

                            )}

                        </div>

                        <div className="collapse rounded-box">
                            <input type="checkbox" className="peer" />
                            <div className={collapse_title}>
                                Click me to show/hide description
                            </div>
                            <div className={collapse_content}>
                                <p>{job.description}</p>
                            </div>
                        </div>

                    </CardComponent>

                </div>
            )}
        </>
    )
}

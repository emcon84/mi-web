import React from 'react'
import { jobsAndPractice } from '../../../data/data'
import { CardComponent } from '../../Card/CardComponent'
import { text__h2_teal_bold_pt, text__h2_white_bold } from '../js/HomeClassTW'

export const JobsAndPractice = () => {
    return (
        <>
            {jobsAndPractice.map((job) =>
                <div className="col" key={job}>
                    <CardComponent>
                        <h2 className={text__h2_white_bold}>{job.title}</h2>
                        <div className='pb-5'>
                            <a href={job.href}>
                                <img src={job.img} alt="Emiliano Conti Gift App example" />
                            </a>
                        </div>
                        <hr />
                        {job.listTech.map((list) =>
                            <ul className='py-3' key={list}>
                                <li className='text-teal-500'>Technology: {list.technology} </li>
                                <li className='text-teal-500'>Deploy: {list.deploy}</li>
                                <li className='text-teal-500'>Link: <a href={list.link[0]}>{list.link[1]}</a></li>
                                <li className='text-teal-500'>View Github code: <a href={list.code[0]}>{list.code[1]}</a></li>
                            </ul>
                        )}
                        <hr />
                        <h3 className={text__h2_teal_bold_pt}>{job.titleDescription}</h3>
                        <p className='text-white'>{job.description}</p>
                    </CardComponent>

                </div>
            )}
        </>
    )
}

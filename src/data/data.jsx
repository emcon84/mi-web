import { FaReact, FaCss3Alt } from 'react-icons/fa'
import { BsFillTelephoneForwardFill, BsTelegram } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { IoLogoWhatsapp } from 'react-icons/io'
import { DiJavascript1 } from 'react-icons/di'
import { AiFillGithub, AiFillGitlab, AiFillHtml5, AiFillLinkedin } from 'react-icons/ai'
import { SiTailwindcss } from 'react-icons/si'


export const dataStack = [
    { id: 1, name: 'HTML5', icon: <AiFillHtml5 size={60} className='text-red-600' /> },
    { id: 2, name: 'CSS', icon: <FaCss3Alt size={60} className='text-blue-400' /> },
    { id: 3, name: 'Javascript', icon: <DiJavascript1 size={60} className='text-yellow-500' /> },
    { id: 4, name: 'React', icon: <FaReact size={60} className='text-blue-500' /> },
    { id: 5, name: 'Tailwind', icon: <SiTailwindcss size={60} className='text-sky-500' /> },
]

export const dataContact = [
    { name: 'Telephone: +549 3482445015', href: 'tel:+954 3482445015', icon: <BsFillTelephoneForwardFill className='text-white mr-3' size={18} /> },
    { name: 'E-mail: emcon84@gmail.com', href: 'mailto:emcon84@gmail.com', icon: <MdEmail className='text-white mr-3' size={20} /> },
    { name: 'Telegram', href: 'https://t.me/Emcon84', icon: <BsTelegram className='text-white mr-3' size={20} /> },
    { name: 'Whatsapp', href: 'https://wa.me/3482445015', icon: <IoLogoWhatsapp className='text-white mr-3' size={20} /> },
]

export const dataSocialNetwork = [
    { name: 'Linkedin', icon: <AiFillLinkedin size={60} className='text-blue-800' />, href: 'https://www.linkedin.com/in/emiliano-conti/' },
    { name: 'Github', icon: <AiFillGithub size={60} className='text-blue-800' />, href: 'https://github.com/emcon84' },
    { name: 'Gitlab', icon: <AiFillGitlab size={60} className='text-blue-800' />, href: 'https://gitlab.com/emcon84' },
]

export const dataPersonalDescripcion = [
    {
        title: 'Personal dsecription. Goals and challenges',
        text: 'The world of development is exciting. Full of challenges, which I look forward to addressing in each new project I work on. I am a self-taught, enterprising, proactive person. I currently work as a frontend developer, but my personality is open to constant learning, to working as a team to solve the tasks that are necessary to achieve any proposed objective. My main goal is to become a fullstack developer, gain experience, constantly train myself to be able to provide the services that any large project needs. For all people, being able to make a personal career is almost the most important thing, which is why I like companies or projects that allow you to take that path little by little.',
        text_finally: "If you like what I'm telling you and you think I can help your development team, don't hesitate to contact me. I would love to be able to chat about new projects and challenges!"
    }
]

export const jobsAndPractice = [
    {
        title: 'Gift App',
        href: 'https://emcon84.github.io/GifExpertApp/',
        img: '../../src/assets/img/GiftApp.png',
        listTech: [{
            technology: 'React',
            deploy: 'Github Pages',
            link: ['https://journal-emcon84.vercel.app/auth/login', 'demo'],
            code: ['https://github.com/emcon84/GifExpertApp', 'code'],
        }],
        titleDescription: 'Description',
        description: 'Application creation practice with React, connecting to an Api, to practice data consumption. Use of hooks and custom hooks to build the application as a learning method.'
    },
    {
        title: 'Notes App',
        href: 'https://journal-emcon84.vercel.app',
        img: '../../src/assets/img/JournalApp.png',
        listTech: [{
            technology: 'React, Redux, Database Firestore, Css, MaterialUI',
            deploy: 'Vercel',
            link: ['https://journal-emcon84.vercel.app', 'demo'],
            code: ['https://github.com/emcon84/new-journal-app', 'code'],
        }],
        titleDescription: 'Description',
        description: 'Practical application created with Vite, using React as a JS library, and a global Store with Redux, to create, modify, update, delete notes. Login and user creation with DB Firestore. Image upload to Cloudinary as external API. Unit Testing with Jest on ReduxSlice and Thunks.'
    },
    {
        title: 'Calendar App',
        href: 'https://emcon-calendar.vercel.app/',
        img: '../../src/assets/img/CalendarApp.png',
        listTech: [{
            technology: 'React, Redux, Bootstrap, Css',
            deploy: 'Vercel',
            link: ['https://emcon-calendar.vercel.app/', 'demo'],
            code: ['https://github.com/emcon84/calendarApp', 'code'],
        }],
        titleDescription: 'Description',
        description: 'Practical application created with Vite, using React as a JS library, and a global Store with Redux, to create, modify, update, delete notes.'
    },
]


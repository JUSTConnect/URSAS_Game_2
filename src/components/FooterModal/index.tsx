import css from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'

import { RootState } from '@/app/store'
import { setFooterModal } from '@/features/mainframe/mainframeSlice'
import MediaLink from '@components/MediaLink'
import Blur from '@components/Blur'


const FooterModal = () => {
    const dispatch = useDispatch()
    const mainframe = useSelector((state: RootState) => state.mainframe)

    return (
        <>
            <Blur
                onClick={ () => dispatch(setFooterModal(false)) }
                isActive={ mainframe.footerModal }
            />
            <div className={ [css.modalContainer, mainframe.footerModal ? css.modalContainerActive : ''].join(' ') }>
                <div className={ css.modal }>
                    <div className={ css.top }>
                        <Link className={ css.link } href='#'>Help</Link>
                        <Link className={ css.link } href='https://ursas.gitbook.io/ursas-game/' target='_blank'>Rules</Link>
                    </div>
                    <div className={ css.bottom }>
                        <div className={ css.marketsLinkSection }>
                            <span className={ 'textMuted' }>
                                markets link:
                            </span>
                            <div className={ css.marketsLink }>
                                <img src="/assets/images/icons/market1.svg" alt="" />
                                <img src="/assets/images/icons/market2.svg" alt="" />
                                <img src="/assets/images/icons/market3.svg" alt="" />
                                <img src="/assets/images/icons/market4.svg" alt="" />
                                <img src="/assets/images/icons/market5.svg" alt="" />
                            </div>
                        </div>
                        <div className={ css.mediaLinks }>
                            <MediaLink href='https://medium.com/@Teddy_arrr     /'>
                                <svg width="21" height="12" viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.8451 6.00033C11.8451 9.29372 9.19353 11.9636 5.92257 11.9636C2.65162 11.9636 0 9.29372 0 6.00033C0 2.70694 2.65162 0.0371094 5.92257 0.0371094C9.19349 0.0371094 11.8451 2.70694 11.8451 6.00033Z" fill="#B5C4E3"/>
                                    <path d="M18.3405 6.00004C18.3405 9.1002 17.0147 11.6134 15.3793 11.6134C13.7438 11.6134 12.418 9.1002 12.418 6.00004C12.418 2.89987 13.7438 0.386719 15.3793 0.386719C17.0148 0.386719 18.3405 2.89987 18.3405 6.00004Z" fill="#B5C4E3"/>
                                    <path d="M21.0009 6.00097C21.0009 8.77859 20.5346 11.0303 19.9594 11.0303C19.3842 11.0303 18.918 8.77859 18.918 6.00097C18.918 3.22336 19.3842 0.97168 19.9594 0.97168C20.5346 0.97168 21.0009 3.22336 21.0009 6.00097Z" fill="#B5C4E3"/>
                                </svg>
                            </MediaLink>
                            <MediaLink href='https://twitter.com/UrsasNFT/'>
                                <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 1.58333C15.4286 1.83333 14.7755 2 14.1225 2.08333C14.7755 1.66667 15.3469 1 15.5918 0.250002C14.9388 0.666669 14.2857 0.916669 13.4694 1.08334C12.898 0.416669 12 0 11.102 0C9.30612 0 7.83673 1.5 7.83673 3.33333C7.83673 3.58333 7.83674 3.83333 7.91837 4.08333C5.22449 3.91666 2.77551 2.58333 1.14285 0.583331C0.897955 1.08333 0.734689 1.66666 0.734689 2.25C0.734689 3.41666 1.30612 4.41667 2.20408 5C1.63265 5 1.14285 4.83333 0.734689 4.58333C0.734689 6.16666 1.87754 7.58333 3.34693 7.83333C3.10203 7.91666 2.77551 7.91666 2.44898 7.91666C2.20408 7.91666 2.04081 7.91666 1.79592 7.83333C2.20408 9.16666 3.42857 10.1667 4.89796 10.1667C3.7551 11.0833 2.36735 11.5833 0.816327 11.5833C0.571429 11.5833 0.326531 11.5833 0 11.5C1.46939 12.4167 3.18367 13 5.06122 13C11.102 13 14.3673 7.91666 14.3673 3.5V3.08333C15.0204 2.83333 15.5918 2.24999 16 1.58333Z" fill="#B5C4E3"/>
                                </svg>
                            </MediaLink>
                            <MediaLink href='https://discord.gg/ursas'>
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.36 0H1.64C0.736 0 0 0.69 0 1.545V11.685C0 12.54 0.736 13.23 1.64 13.23H10.712L10.288 11.8425L11.312 12.735L12.28 13.575L14 15V1.545C14 0.69 13.264 0 12.36 0ZM9.272 9.795C9.272 9.795 8.984 9.4725 8.744 9.1875C9.792 8.91 10.192 8.295 10.192 8.295C9.864 8.4975 9.552 8.64 9.272 8.7375C8.872 8.895 8.488 9 8.112 9.06C7.344 9.195 6.64 9.1575 6.04 9.0525C5.584 8.97 5.192 8.85 4.864 8.73C4.68 8.6625 4.48 8.58 4.28 8.475C4.256 8.46 4.232 8.4525 4.208 8.4375C4.192 8.43 4.184 8.4225 4.176 8.415C4.032 8.34 3.952 8.2875 3.952 8.2875C3.952 8.2875 4.336 8.8875 5.352 9.1725C5.112 9.4575 4.816 9.795 4.816 9.795C3.048 9.7425 2.376 8.655 2.376 8.655C2.376 6.24 3.528 4.2825 3.528 4.2825C4.68 3.4725 5.776 3.495 5.776 3.495L5.856 3.585C4.416 3.975 3.752 4.5675 3.752 4.5675C3.752 4.5675 3.928 4.4775 4.224 4.35C5.08 3.9975 5.76 3.9 6.04 3.8775C6.088 3.87 6.128 3.8625 6.176 3.8625C6.664 3.8025 7.216 3.7875 7.792 3.8475C8.552 3.93 9.368 4.14 10.2 4.5675C10.2 4.5675 9.568 4.005 8.208 3.615L8.32 3.495C8.32 3.495 9.416 3.4725 10.568 4.2825C10.568 4.2825 11.72 6.24 11.72 8.655C11.72 8.655 11.04 9.7425 9.272 9.795ZM5.552 6.2925C5.096 6.2925 4.736 6.6675 4.736 7.125C4.736 7.5825 5.104 7.9575 5.552 7.9575C6.008 7.9575 6.368 7.5825 6.368 7.125C6.376 6.6675 6.008 6.2925 5.552 6.2925ZM8.472 6.2925C8.016 6.2925 7.656 6.6675 7.656 7.125C7.656 7.5825 8.024 7.9575 8.472 7.9575C8.928 7.9575 9.288 7.5825 9.288 7.125C9.288 6.6675 8.928 6.2925 8.472 6.2925Z" fill="#B5C4E3"/>
                                </svg>
                            </MediaLink>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    ) 
}


export default FooterModal
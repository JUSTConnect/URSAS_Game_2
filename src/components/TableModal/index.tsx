import css from './index.module.css'

import { useState } from 'react'

import Place from './Place'

interface TableModalProps extends React.HTMLAttributes<HTMLDivElement>
{
    active?: boolean  
    setActive?: Function
}


const TableModal = (props: TableModalProps) => {
    const [step, setStep] = useState('basket_empty')
    const [alert, setAlert] = useState('')

    return <div className={ [css.modalContainer, props.active ? css.modalContainerActive : ''].join(' ') }>
        <div className={ css.modal }>
            { alert ? (
                <div className={ css.modalAlert }>
                    <img className={ css.modalAlertIcon } src="assets/images/icons/alert.png" alt="Alert" />
                    { alert }
                </div>
            ) : (
                <></>
            ) }
            <div className={ css.modalHeader }>
                {{
                    basket_empty: (
                        <>
                            <div>
                                Basket places
                            </div>
                            <div>
                                <button onClick={ () => setStep('choose_card') } className={ css.modalButtonNext }>
                                    <img className={ css.modalButtonNextIcon } src="assets/images/icons/arrow-right.png" alt="Arrow Right" />
                                </button>
                            </div>
                        </>
                    ),
                    choose_card: (
                        <>
                            <div>
                                Сhoose cart <span className={ css.textLight }>place №3</span>
                            </div>
                            <div>
                                <button onClick={ () => {setStep('confirm_places');setAlert('Places not subbmit - clear/confirm or press exit again')} } className={ css.modalButtonNext }>
                                    <img className={ css.modalButtonNextIcon } src="assets/images/icons/arrow-right.png" alt="Arrow Right" />
                                </button>
                            </div>
                        </>
                    ),
                    confirm_places: (
                        <>
                            <div>
                                Confirm places <span className={ css.textLight }>01:56</span>
                            </div>
                            <div className={ css.modalHeaderButtons }>
                                <button className={ css.modalHeaderButton }>
                                    submit
                                </button>
                                <button onClick={ () => {setStep('confirm_places2');setAlert('')} } className={ css.modalButtonNext }>
                                    <img className={ css.modalButtonNextIcon } src="assets/images/icons/arrow-right.png" alt="Arrow Right" />
                                </button>
                            </div>
                        </>
                    ),
                    confirm_places2: (
                        <>
                            <div>
                                Confirm places <span className={ css.textLight }>01:56</span>
                            </div>
                            <div className={ css.modalHeaderButtons }>
                                <button className={ css.modalHeaderButton }>
                                    submit
                                </button>
                                <button onClick={ () => {setStep('finish');setAlert('')} } className={ css.modalButtonNext }>
                                    <img className={ css.modalButtonNextIcon } src="assets/images/icons/arrow-right.png" alt="Arrow Right" />
                                </button>
                            </div>
                        </>
                    ),
                    finish: (
                        <>
                            <div>
                                Basket places
                            </div>
                            <div>
                                <button onClick={ () => setStep('basket_empty') } className={ css.modalButtonNext }>
                                    <img className={ css.modalButtonNextIcon } src="assets/images/icons/arrow-right.png" alt="Arrow Right" />
                                </button>
                            </div>
                        </>
                    )
                } [step] || 'not_found' }
            </div>
            <div className={ [step !== 'basket_empty' ? css.modalContent : '', css.modalContentRaw].join(' ') }>
                {{
                    basket_empty: (
                        <div className={ css.basketEmptyContainer }>
                            <div className={ css.basketEmptyContent }>
                                <div className={ css.basketEmptyTitle }>
                                    Your basket  is empty
                                </div>
                                <div className={ css.basketEmptyDescription }>
                                    Please choose places
                                </div>
                                <div className={ css.basketEmptyCircle }></div>
                                <img className={ css.basketEmptySofa } src="assets/images/texture/table-sofa-modal.png" alt="" />
                            </div>
                        </div>
                    ),
                    choose_card: (
                        <div className={ css.cards }>
                            { [...Array(100)].map((item,index)=>(
                                <img  onClick={ () => {setStep('confirm_places');setAlert('Places not subbmit - clear/confirm or press exit again')} } className={ css.card } key={index} src="assets/images/texture/example-card.png" alt="card" />
                            ))}
                        </div>
                    ),
                    confirm_places: (
                        <div className={ css.places }>
                            <Place
                                number={1}
                                card={false}
                            />
                            <Place
                                return={true}
                            />
                            <Place
                                clear={true}
                            />
                            <Place
                                number={1}
                                card={true}
                            />
                            <Place
                                number={1}
                                card={true}
                            />
                            <Place
                                number={1}
                                card={true}
                            />
                            <Place
                                number={1}
                                card={true}
                            />

                        </div>
                    ),
                    confirm_places2: (
                        <div className={ css.dialog }>
                            <div className={ css.dialogContent }>
                                <div className={ [css.dialogPlace, 'textMuted'].join(' ') }>
                                    place
                                </div>
                                <div className={ [css.dialogNumber, 'fontSpecial'].join(' ') }>
                                    № 3
                                </div>
                                <div className={ css.dialogButtons }>
                                    <Place
                                        return={true}
                                    />
                                    <Place
                                        cancel={true}
                                    />
                                </div>
                            </div>
                        </div>
                    ),
                    finish: (
                        <div className={ css.loading }>
                            <img className={ css.loadingIcon } src="assets/images/icons/logo-loading.png" alt="Loading" />
                        </div>
                    )
                } [step] || 'not_found' }
            </div>
            { step !== 'basket_empty' && step !== 'confirm_places2' ? (
                <div className={ css.modalFooter }>
                    <div className={ css.modalFooterButtons }>
                        <div className={ css.modalFooterButton }>
                            <img className={ css.modalFooterButtonIcon } src="assets/images/icons/return.png" alt="Icon" />
                            return all
                        </div>
                        <div className={ css.modalFooterButton }>
                            <img className={ css.modalFooterButtonIcon } src="assets/images/icons/clear.png" alt="Icon" />
                            clear all
                        </div>
                    </div>
                </div>       
            ) : (
                <></>
            ) }
        </div>
    </div>
}


export default TableModal
import React, {useState} from 'react';
import styles from './Pagination.module.css';

type PaginationPropsType = {
    totalItemsCount: number
    usersPerPage: number
    currentPage?: number
    onPageChanged: (page: number) => void
    portionSize: number
}

export const Pagination = React.memo((props: PaginationPropsType) => {
    console.log('pagination rerender')
    let [portionOfButtons, setPortionOfButtons] = useState(1);
    let numberOfPages = Math.ceil(props.totalItemsCount / props.usersPerPage)
    let portionOfButtonsCount = Math.ceil(numberOfPages / props.portionSize)

    const pages: number[] = []
    for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i)
    }
    let firstPortionPageNumber = (portionOfButtons - 1) * props.usersPerPage + 1

    let lastPortionPageNumber = portionOfButtons * props.usersPerPage

    return (
        <div className={styles.pagination}>
            <div className={styles.buttonsBlock}>
                <button
                    className="button"
                    disabled={portionOfButtons <= 1}
                    onClick={() => setPortionOfButtons(portionOfButtons - 1)}
                >
                    Prev</button>
                {pages
                    .filter(p => p >= firstPortionPageNumber && p <= lastPortionPageNumber)
                    .map((p: number, i) => {
                    return <button key={i}
                                   className={props.currentPage === p ? styles.currentPage : ''}
                                   onClick={() => {
                                       props.onPageChanged(p)
                                   }}>
                        {p}
                    </button>
                })}
                <button
                    className="button"
                    disabled={portionOfButtonsCount < portionOfButtons}
                    onClick={() => setPortionOfButtons(portionOfButtons + 1)}
                >
                    Next</button>
            </div>
            <span className={styles.optionsBlock}>
                Show
                <select name="" id=""></select>
                Cards per Page
            </span>
        </div>
    )
})

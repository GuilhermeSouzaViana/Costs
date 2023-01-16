import styles from './Load.module.css'

import loading from '../../img/loading.svg'

function Load() {
    return (
        <div className={styles.load_container}>
            <img  className={styles.load} src={loading} alt='Loading'></img>
        </div>
    )
}

export default Load
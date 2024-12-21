import Snackbar from '@mui/joy/Snackbar';
import { useState } from 'react';

const PopUp = ( {open} ) => {
    const [setOpenr , openr ] = useState(open)
    return (
        <div>
            <Snackbar
                autoHideDuration={3000}
                color="danger"
                size="md"
                variant="solid"
                open={open}
                onClose={() => {
                    setOpenr(false)
                  }}
            >
                I love snacks
            </Snackbar>
        </div>
    )
}

export default PopUp

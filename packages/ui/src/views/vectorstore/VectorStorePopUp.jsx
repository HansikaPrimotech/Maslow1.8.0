import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { Button } from '@mui/material'
import { IconDatabaseImport, IconX } from '@tabler/icons'

// project import
import { StyledFab } from '@/ui-component/button/StyledFab'
import VectorStoreDialog from './VectorStoreDialog'

// // api
// import vectorstoreApi from '@/api/vectorstore' current

// // Hooks
// import useNotifier from '@/utils/useNotifier'

// // Const
// import { enqueueSnackbar as enqueueSnackbarAction, closeSnackbar as closeSnackbarAction } from '@/store/actions'

// export const VectorStorePopUp = ({ chatflowid }) => {
//     const dispatch = useDispatch()

//     useNotifier()
//     const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args))
//     const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args))

//     const [open, setOpen] = useState(false)
//     const [showExpandDialog, setShowExpandDialog] = useState(false)
//     const [expandDialogProps, setExpandDialogProps] = useState({})
import UpsertResultDialog from './UpsertResultDialog'

export const VectorStorePopUp = ({ chatflowid }) => {
    const [open, setOpen] = useState(false)
    const [showExpandDialog, setShowExpandDialog] = useState(false)
    const [expandDialogProps, setExpandDialogProps] = useState({})
    const [showUpsertResultDialog, setShowUpsertResultDialog] = useState(false)
    const [upsertResultDialogProps, setUpsertResultDialogProps] = useState({})

    const anchorRef = useRef(null)
    const prevOpen = useRef(open)

    const handleToggle = () => {
        setOpen((prevopen) => !prevopen)
        const props = {
            open: true,
            title: 'Upsert Vector Store',
            chatflowid
        }
        setExpandDialogProps(props)
        setShowExpandDialog(true)
    }

    // const onUpsert = async () => {
    //     try {
    //         await vectorstoreApi.upsertVectorStore(chatflowid, {})
    //         enqueueSnackbar({
    //             message: 'Succesfully upserted vector store',
    //             options: {
    //                 key: new Date().getTime() + Math.random(),
    //                 variant: 'success',
    //                 action: (key) => (
    //                     <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
    //                         <IconX />
    //                     </Button>
    //                 )
    //             }
    //         })
    //     } catch (error) {
    //         const errorData = error.response.data || `${error.response.status}: ${error.response.statusText}`
    //         enqueueSnackbar({
    //             message: errorData,
    //             options: {
    //                 key: new Date().getTime() + Math.random(),
    //                 variant: 'error',
    //                 persist: true,
    //                 action: (key) => (
    //                     <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
    //                         <IconX />
    //                     </Button>
    //                 )
    //             }
    //         })
    //     }
    // } current

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus()
        }
        prevOpen.current = open

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, chatflowid])

    return (
        <>
            <StyledFab
                sx={{
                    position: 'absolute',
                    width: "100px",
                    right: "138px",
                    top: 20,
                    // backgroundColor: '#2CD552',
                    background: 'linear-gradient(to bottom right, #e084b4 0%, #77bfaf 100%)',
                    '&:hover': {
                        background: 'linear-gradient(to bottom right, #e084b4 0%, #77bfaf 100%)'
                    }
                }}
                ref={anchorRef}
                size='small'
                color='teal'
                aria-label='upsert'
                title='Upsert Vector Database'
                onClick={handleToggle}
            >
                {open ? <IconX /> : <IconDatabaseImport />}
                {/* <p style={{ fontSize: "1rem", marginLeft: "5px" }}>Upsert</p>  current*/}
            </StyledFab>
            <VectorStoreDialog
                show={showExpandDialog}
                dialogProps={expandDialogProps}
                // onUpsert={onUpsert} current
                onCancel={() => {
                    setShowExpandDialog(false)
                    setOpen((prevopen) => !prevopen)
                }}
                onIndexResult={(indexRes) => {
                    setShowExpandDialog(false)
                    setShowUpsertResultDialog(true)
                    setUpsertResultDialogProps({ ...indexRes })
                }}
            ></VectorStoreDialog>
            <UpsertResultDialog
                show={showUpsertResultDialog}
                dialogProps={upsertResultDialogProps}
                onCancel={() => {
                    setShowUpsertResultDialog(false)
                    setOpen(false)
                }}
            ></UpsertResultDialog>
        </>
    )
}

VectorStorePopUp.propTypes = { chatflowid: PropTypes.string }

import React from "react"
import './style.css'
import SessionSignedIn from './session-signedin'

export default function Session() {

    let [signedIn, setSignedIn] = React.useState(false)
    const form = React.useRef()

    React.useEffect(() => (
        fetch('/api/session/get')
            .then(response => response.json())
            .then(result => setSignedIn(result.signedIn))
            .catch(err => alert(err))
    ), [])

    const onSubmitForm = (event) => {
        event.preventDefault()
        const fd = new FormData(form.current)
        const fe = Object.fromEntries(fd.entries())
        fetch('/api/session/set', {
            method: 'POST',
            body: JSON.stringify(fe),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(result => {
                if (result.signedIn) {
                    setSignedIn(result.signedIn)
                } else {
                    alert('Email หรือ password ไม่ถูกต้อง')
                }
            })
            .catch(err => alert(err))
    }

    if (!signedIn) {
        return (
            <div style={{ margin: '30px' }} >
                <form onSubmit={onSubmitForm} ref={form}>
                    <input type="email" name="email" placeholder="Email" /><br />
                    <input type="password" name="pswd" placenolder="Password" />
                    <br /><br />
                    <button>ส่งข้อมูล</button>
                </form >
            </div >
        )
    } else {
        return <SessionSignedIn/>
    }
}
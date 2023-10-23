import React from "react"

export default function SessionSignedIn() {
    const onClickLink = (event) => {
        event.preventDefault()
            .fetch('/api/session/del')
            .then(response => response.text())
            .then(result => window.location.href = '/session')
            .catch(err => alert(err))
    }

    return (
    <div style={{margin: '30px'}}>
        <h3>ท่านเข้าสู่ระบบแล้ว</h3><br/>
        <a href={''} onclick = {(e) => onClickLink(e)} >ออกจากระบบ</a>
    </div>
    )
}

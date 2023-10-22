import React from 'react'
import DBCreate from './db-create'
import DBRead from './db-read'
import DBUpdate from './db-update'
import DBDelete from './db-delete'

export default function CRUD() {
    const path = window.location.pathname
    switch (path) {
        case '/db': 
            return (    
                <div style={{margin: '30px 50px'}}>
                    <a href="/db/create">เพิ่มข้อมูล</a> <br/>
                    <a href="/db/read">แสดงข้อมูล</a> <br/>
                    <a href="/db/update">แก้ไขข้อมูล</a> <br/>
                    <a href="/db/delete">ลบข้อมูล</a> <br/>
                </div>
            )
        case '/db/create':  return <DBCreate/>
        case '/db/read': return <DBRead/>
        case '/db/update': return <DBUpdate/>
        case '/db/delete': return <DBDelete/>
        default: window.location.href = '/db'
    }
}
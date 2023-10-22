import React from 'react'
import DBCreate from './db-create'
import DBRead from './db-read'
import DBUpdate from './db-update'
import DBDelete from './db-delete'
import DBPaginate from './db-paginate'
import DBSearch from './db-search'

export default function DBNav() {
    const path = window.location.pathname
    switch (path) {
        case '/db': 
            return (    //แสดงเมนู
                <div style={{margin: '30px 50px'}}>
                    <a href="/db/create">เพิ่มข้อมูล</a> <br/>
                    <a href="/db/read">แสดงข้อมูล</a> <br/>
                    <a href="/db/update">แก้ไขข้อมูล</a> <br/>
                    <a href="/db/delete">ลบข้อมูล</a> <br/>
                    <a href="/db/paginate">แบ่งเพจ</a> <br/>
                    <a href="/db/search">Workshop: ค้นหาข้อมูล</a> <br/>
                </div>
            )
        case '/db/create':  return <DBCreate/>
        case '/db/read': return <DBRead/>
        case '/db/update': return <DBUpdate/>
        case '/db/delete': return <DBDelete/>
        case '/db/paginate': return <DBPaginate/>
        case '/db/search': return <DBSearch/>
        default: window.location.href = '/db'
    }
}
import React from 'react'
import {Link} from 'react-router-dom'
export default function BackToAccount() {
    return (
        <nav>
            <div><Link className="btn btn-success m-2" to="/account">My Account</Link></div>
        </nav>
    )
}

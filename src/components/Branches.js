import React from 'react';
import '../assets/css/branchesPage.css';

export default function Branches() {

    return (
        <div className="homepage">
            <div className="parent-div">
                <div className="branch-div">
                    <h2>Branches</h2>
                </div>
                <div className="branch">
                    <ul>
                        <li>Branch 1</li>
                        <li>Branch 2</li>
                    </ul>    
                </div>
            </div>
        </div>
    )
}